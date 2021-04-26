import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gqlAuth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: "SECRETKEY123"
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    GqlAuthGuard,
    HashService,
    JwtStrategy
  ]
})
export class AuthModule {}
