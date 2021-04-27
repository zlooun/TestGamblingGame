import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "./interfaces/createUser.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as crypto from "crypto";
import { v4 as uuid } from 'uuid';
import { HashService } from "src/hash/hash.service";

@Injectable()
export class UserService {

	constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
		private readonly hashService: HashService
  ) { }

	async find(id: string) {
		return await this.userRepository.findOne(id);
	}

	async findByLogin(login: string) {
		return await this.userRepository.findOne({login});
	}

	async create(data: CreateUser) {
		const id = uuid();
		const salt = this.hashService.getSalt(id); //crypto.createHash("sha512").update(id + Math.random()).digest("hex");
		const hashPassword = this.hashService.hashPassword(id, salt, data.password); //crypto.createHash("sha512").update(data.password + id + salt).digest("hex");
		const user = new User();
		user.id = id;
		user.login = data.login;
		user.salt = salt;
		user.password = hashPassword;
		user.name = data.name;
		return await this.userRepository.save(user);
	}

	async pay(userId: string, amount: number) {
		const user = await this.userRepository.findOne(userId);

		if (user.balance < amount) {
			throw new Error("Insufficient funds");
		}

		user.balance = user.balance - amount;
		user.save();
	}

	async addMoney(userId: string, amount: number) {
		const user = await this.userRepository.findOne(userId);
		user.balance = user.balance + amount;
		user.save();
	}
}