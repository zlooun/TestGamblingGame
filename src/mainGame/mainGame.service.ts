import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSubEngine } from 'graphql-subscriptions';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
import { MainGame } from './mainGame.entity';
import { MainGameRepository } from './mainGame.repository';

@Injectable()
export class MainGameService {

	sessions: string[] = [];
	probability: number = 49;

	constructor(
    private readonly userService: UserService,
		@InjectRepository(MainGameRepository) private mainGameRepository: MainGameRepository,
		@Inject('PUB_SUB') private pubSub: PubSubEngine,
  ){
		try {
			const probability = Number(process.env.PROBABILITY);
			if (!probability ||
				typeof probability != "number" ||
				probability < 0 ||
				probability > 100
			) {
				return;
			}
			this.probability = probability;
			console.log(this.probability)
		} catch (error) {}
	}

	public async startGame(userId: string, bet: number) {
		const sessionKey = userId;

		if (this.sessions.includes(sessionKey)) {
			throw new BadRequestException("The game has already been started");
		}

		await this.userService.pay(userId, bet);
		this.sessions.push(sessionKey);
		const gameId = uuid();
		this.play(gameId, sessionKey, userId, bet);
		return gameId;
	}

	public async getResult(userId: string, gameId: string) {
		const game = await this.mainGameRepository.findOne(gameId, {
			where: {
				userId
			}
		});

		if (!game) {
			return new BadRequestException("Game has not been found");
		}
		return game.result;
	}

	private async play(gameId: string, sessionKey: string, userId: string, bet: number) {
		setTimeout(async () => {
			const probability = this.probability;
			console.log("probability", probability)
			let result: boolean;
			const random = this.randomCore();
			console.log(random);

			if (random > probability) {
				result = false;
			}
			else {
				result = true;
			}

			if (result) {
				await this.userService.addMoney(userId, bet * 2);
			}

			const getMainGameResultSub = {
				gameId,
				result
			}

			for (let i = 0; i < this.sessions.length; i++) {
				const session = this.sessions[i];
				
				if (session == sessionKey){
					this.sessions.splice(i, 1);
					break;
				}
			}
			const game = new MainGame();
			game.id = gameId;
			game.userId = userId;
			game.result = result;
			game.resultValue = random;
			game.bet = bet;
			game.probability = probability;
			await game.save();

			await this.pubSub.publish('getMainGameResult', {
				getMainGameResultSub
			});
		}, 5000);
	}

	private randomCore() {
		return Math.floor(Math.random()*100) + 1;
	}
}
