import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './configs/typeorm.config';
import { PlaygroundModule } from './mainGame/mainGame.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PlaygroundModule,
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfig}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
      installSubscriptionHandlers: true,
      context: (ctx) => {
        const newFieldsToCtx: any = {
          req: ctx.req
        }

        try {
          newFieldsToCtx.authorization = ctx.connection.context.authorization
        } catch (error) {
        }

        return newFieldsToCtx;
      },
      uploads: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
