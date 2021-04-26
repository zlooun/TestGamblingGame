import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthRegisterInput {
	@Field()
	login: string;
	@Field()
	password: string;
	@Field({nullable: true})
	name?: string;
}