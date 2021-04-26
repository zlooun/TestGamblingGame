import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserToken {
	@Field()
  readonly token: string;
  @Field(() => User)
  readonly user: User;
}