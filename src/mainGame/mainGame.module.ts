import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from 'src/user/user.module';
import { MainGameRepository } from './mainGame.repository';
import { MainGameResolver } from './mainGame.resolver';
import { MainGameService } from './mainGame.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      MainGameRepository
    ])
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    MainGameService,
    MainGameResolver
  ],
})
export class PlaygroundModule {}
