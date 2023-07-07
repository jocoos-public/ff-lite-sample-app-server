import { Injectable } from '@nestjs/common';
import { FFGetTranscodingProfilesParams } from '../ffl-api/dto/transcoding-profile.dto';
import { FflApiService } from '../ffl-api/ffl-api.service';
import { Request } from 'express';

@Injectable()
export class TranscodingProfilesService {
  constructor(private readonly fflApiService: FflApiService) {}

  findAll(req: Request, query?: FFGetTranscodingProfilesParams) {
    return this.fflApiService.getTranscodingProfiles(query);
  }

  findOne(req: Request, id: number) {
    return this.fflApiService.getTranscodingProfile(id);
  }
}
