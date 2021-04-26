import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  providers: [
    UserService,
    HashService
  ],
  exports: [UserService],
})
export class UserModule {}
