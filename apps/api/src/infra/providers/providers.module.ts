import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PasswordHashService, TokenService } from '@core/cryptography';

import { BcryptPasswordHashService } from './bcrypt-password-hash.service';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    {
      provide: PasswordHashService,
      useClass: BcryptPasswordHashService,
    },
  ],
  exports: [TokenService, PasswordHashService],
})
export class ProvidersModule {}
