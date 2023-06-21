import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultInterceptor } from './interceptors/default-interceptor';
import { EnvVars } from './env-vars';
import { FflApiModule } from './ffl-api/ffl-api.module';
import { VideoRoomsModule } from './video-rooms/video-rooms.module';
import { StreamKeysModule } from './stream-keys/stream-keys.module';
import { VideoPostsModule } from './video-posts/video-posts.module';
import { TranscodingProfilesModule } from './transcoding-profiles/transcoding-profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(EnvVars.MONGO_DB_URI),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FflApiModule,
    VideoRoomsModule,
    StreamKeysModule,
    VideoPostsModule,
    TranscodingProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultInterceptor,
    },
  ],
})
export class AppModule {}
