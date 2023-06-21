import { Module } from '@nestjs/common';
import { FflApiService } from './ffl-api.service';

@Module({
  providers: [FflApiService],
  exports: [FflApiService],
})
export class FflApiModule {}
