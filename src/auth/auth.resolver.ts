import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthLoginInput } from "./inputs/login.input";
import { AuthRegisterInput } from "./inputs/register.input";
import { UserToken } from "./models/userToken.model";

@Resolver()
export class AuthResolver {

	constructor(
    private readonly authService: AuthService,
  ) {}

	@Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

	@Mutation(() => UserToken)
	register(@Args("input") input: AuthRegisterInput): Promise<UserToken> {
		return this.authService.register(input);
	}

	@Mutation(() => UserToken)
	login(@Args("input") input: AuthLoginInput): Promise<UserToken> {
		return this.authService.login(input);
	}

}