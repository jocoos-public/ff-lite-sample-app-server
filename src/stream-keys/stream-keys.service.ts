import { Injectable } from '@nestjs/common';
import {
  FFGetStreamKeysParams,
  FFUpdateStreamKeyDto,
} from 'src/ffl-api/dto/stream-key.dto';
import { FflApiService } from 'src/ffl-api/ffl-api.service';
import { Request } from 'express';

@Injectable()
export class StreamKeysService {
  constructor(private readonly fflApiService: FflApiService) {}

  reissue(res: Request, streamKeyId: number) {
    return this.fflApiService.reissueStreamKey(streamKeyId);
  }

  findAll(res: Request, query: FFGetStreamKeysParams) {
    return this.fflApiService.getStreamKeys(query);
  }

  findOne(res: Request, streamKeyId: number) {
    return this.fflApiService.getStreamKey(streamKeyId);
  }

  update(
    res: Request,
    streamKeyId: number,
    updateStreamKeyDto: FFUpdateStreamKeyDto,
  ) {
    return this.fflApiService.updateStreamKey(streamKeyId, updateStreamKeyDto);
  }
}
