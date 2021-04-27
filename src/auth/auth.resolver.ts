import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { CtxUser } from "./decorators/ctxUser.decorator";
import { GqlAuthGuard } from "./guards/gqlAuth.guard";
import { AuthLoginInput } from "./inputs/login.input";
import { AuthRegisterInput } from "./inputs/register.input";
import { UserToken } from "./models/userToken.model";

@Resolver("auth")
export class AuthResolver {

	constructor(
    private readonly authService: AuthService,
  ) {}

	@UseGuards(GqlAuthGuard)
	@Query(() => String)
  sayHello(
		@CtxUser() user: User
	): string {
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