import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { StreamKeysService } from './stream-keys.service';
import {
  FFGetStreamKeysParams,
  FFUpdateStreamKeyDto,
} from '../ffl-api/dto/stream-key.dto';
import { Request } from 'express';

@Controller('stream-keys')
export class StreamKeysController {
  constructor(private readonly streamKeysService: StreamKeysService) {}

  @Post(':streamKeyId')
  reissue(@Req() req: Request, @Param('streamKeyId') streamKeyId: string) {
    return this.streamKeysService.reissue(req, +streamKeyId);
  }

  @Get()
  findAll(@Req() req: Request, @Query() query: FFGetStreamKeysParams) {
    return this.streamKeysService.findAll(req, query);
  }

  @Get(':streamKeyId')
  findOne(@Req() req: Request, @Param('streamKeyId') streamKeyId: string) {
    return this.streamKeysService.findOne(req, +streamKeyId);
  }

  @Patch(':streamKeyId')
  update(
    @Req() req: Request,
    @Param('streamKeyId') streamKeyId: string,
    @Body() updateStreamKeyDto: FFUpdateStreamKeyDto,
  ) {
    return this.streamKeysService.update(req, +streamKeyId, updateStreamKeyDto);
  }
}
