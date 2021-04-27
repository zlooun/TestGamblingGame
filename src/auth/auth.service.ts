import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthLoginInput } from "./inputs/login.input";
import { AuthRegisterInput } from "./inputs/register.input";
import * as trim from "trim";
import { HashService } from "src/hash/hash.service";
import { JwtDto } from "./dto/jwt.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

	constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) { }

	public async register(input: AuthRegisterInput) {

		input.login = trim(input.login);
		input.password = trim(input.password);

		if (await this.userService.findByLogin(input.login)) {
			throw new BadRequestException(`Cannot register with login ${input.login}`);
		}

		if (!this.verifyLogin(input.login)) {
			throw new BadRequestException(`Invalid login ${input.login}`);
		}
		
		const createdUser = await this.userService.create(input);
		return {
			user: createdUser,
			token: this.signToken(createdUser.id)
		}

	}

	public async login(input: AuthLoginInput) {
		input.login = trim(input.login);
		input.password = trim(input.password);

		const user = await this.userService.findByLogin(input.login);
		
		if (!user) {
			throw new BadRequestException(`User with this login ${input.login} does not exist`);
		}

		if (!this.hashService.validatePassword(user.id, user.salt, user.password, input.password)){
			throw new Error("Invalid password");
		}

		return { user, token: this.signToken(user.id)}
	}

	private signToken(id: string) {
		const payload: JwtDto = {userId: id};
		return this.jwtService.sign(payload);
	}

	private verifyLogin(login: string) {
		const loginPattern = /^[a-zA-Z](([a-zA-Z0-9_-]){2,20})$/;
		return loginPattern.test(login);
	}

	public async validateUser(userId: string) {
		return this.userService.find(userId);
	}
}