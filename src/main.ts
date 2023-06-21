import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './env-vars';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  EnvVars.log(config);
  const reflector = app.get(Reflector);
  const jwt = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(config, reflector, jwt));

  await app.listen(config.get<number>(EnvVars.PORT, 3000));
}
bootstrap();
