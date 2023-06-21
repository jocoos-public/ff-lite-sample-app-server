import { Module } from '@nestjs/common';
import { VideoRoomsService } from './video-rooms.service';
import { VideoRoomsController } from './video-rooms.controller';
import { FflApiModule } from 'src/ffl-api/ffl-api.module';

@Module({
  imports: [FflApiModule],
  controllers: [VideoRoomsController],
  providers: [VideoRoomsService],
})
export class VideoRoomsModule {}
