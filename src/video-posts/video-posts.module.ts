import { Module } from '@nestjs/common';
import { VideoPostsService } from './video-posts.service';
import { VideoPostsController } from './video-posts.controller';
import { FflApiModule } from '../ffl-api/ffl-api.module';

@Module({
  imports: [FflApiModule],
  controllers: [VideoPostsController],
  providers: [VideoPostsService],
})
export class VideoPostsModule {}
