import { config } from 'dotenv';
import * as path from 'path';
config({
  path: path.join(__dirname, '../env', `${process.env.NODE_ENV}.env`),
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
