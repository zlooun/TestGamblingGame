import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MainGameResult {
	@Field(()=>ID)
  readonly gameId: string;
  @Field()
  readonly result: boolean;
}