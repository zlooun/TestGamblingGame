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

	async find(login: string) {
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
}