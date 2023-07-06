import { Module } from '@nestjs/common';
import { StreamKeysService } from './stream-keys.service';
import { StreamKeysController } from './stream-keys.controller';
import { FflApiModule } from '../ffl-api/ffl-api.module';

@Module({
  imports: [FflApiModule],
  controllers: [StreamKeysController],
  providers: [StreamKeysService],
})
export class StreamKeysModule {}
