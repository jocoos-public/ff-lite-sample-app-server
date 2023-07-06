import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { TranscodingProfilesService } from './transcoding-profiles.service';
import { FFGetTranscodingProfilesParams } from '../ffl-api/dto/transcoding-profile.dto';
import { Request } from 'express';

@Controller('transcoding-profiles')
export class TranscodingProfilesController {
  constructor(
    private readonly transcodingProfilesService: TranscodingProfilesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Req() req: Request,
    @Query() query?: FFGetTranscodingProfilesParams,
  ) {
    return this.transcodingProfilesService.findAll(req, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.transcodingProfilesService.findOne(req, +id);
  }
}
