import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field(()=>ID)
  readonly id: string;
  @Field({nullable: true})
  readonly name?: string;
  @Field()
  readonly login: string;
  @Field()
  readonly password: string;
}