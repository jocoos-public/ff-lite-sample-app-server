import { Module } from '@nestjs/common';
import { TranscodingProfilesService } from './transcoding-profiles.service';
import { TranscodingProfilesController } from './transcoding-profiles.controller';
import { FflApiModule } from '../ffl-api/ffl-api.module';

@Module({
  imports: [FflApiModule],
  controllers: [TranscodingProfilesController],
  providers: [TranscodingProfilesService],
})
export class TranscodingProfilesModule {}
