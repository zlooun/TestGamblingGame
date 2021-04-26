import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './hash.service';

@Module({
  providers: [
    HashService
  ],
  exports: [HashService],
})
export class HashModule {}
