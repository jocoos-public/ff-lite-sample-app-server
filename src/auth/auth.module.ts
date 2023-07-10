import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVars } from '../env-vars';
import { FflApiModule } from '../ffl-api/ffl-api.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {

        return {
          global: true,
          secret: config.get<string>(EnvVars.JWT_SECRET),
          signOptions: { expiresIn: '3600s' },
        };
      },
      inject: [ConfigService],
    }),
    FflApiModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
