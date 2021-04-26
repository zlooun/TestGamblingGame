import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthLoginInput {
	@Field()
	login: string;
	@Field()
	password: string;
}