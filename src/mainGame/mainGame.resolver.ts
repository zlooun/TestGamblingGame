import { Inject, UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { CtxUser } from "src/auth/decorators/ctxUser.decorator";
import { GqlAuthGuard } from "src/auth/guards/gqlAuth.guard";
import { User } from "src/user/user.entity";
import { MainGameService } from "./mainGame.service";
import { MainGameResult } from "./models/mainGameResult.model";
import { PubSubEngine } from 'graphql-subscriptions';
import { GqlAuthGuardWebSocket } from "src/auth/guards/gqlAuthWebSocket.guard";

@Resolver("mainGame")
export class MainGameResolver {

	constructor(
    private readonly mainGameService: MainGameService,
		@Inject('PUB_SUB') private pubSub: PubSubEngine
  ) {}

	/* @UseGuards(GqlAuthGuard)
	@Query(() => String)
  sayHello(
		@CtxUser() user: User
	): string {
		console.log(user)
    return 'Hello World!';
  }

	@Mutation(() => UserToken)
	register(@Args("input") input: AuthRegisterInput): Promise<UserToken> {
		return this.authService.register(input);
	}

	@Mutation(() => UserToken)
	login(@Args("input") input: AuthLoginInput): Promise<UserToken> {
		return this.authService.login(input);
	} */

	@UseGuards(GqlAuthGuardWebSocket)
	@Subscription(() => MainGameResult, { nullable: true })
  getMainGameResultSub() {
    return this.pubSub.asyncIterator('getMainGameResult');
  }

	@UseGuards(GqlAuthGuard)
	@Mutation(() => ID)
	public async startGame(
		@CtxUser() user: User,
		@Args('bet') bet: number
	) {
		return await this.mainGameService.startGame(user.id, bet);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => String)
	public async getGameResult(
		@CtxUser() user: User,
		@Args('id') id: string
	) {
		return await this.mainGameService.getResult(user.id, id);
	}
}