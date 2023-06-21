import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { VideoRoomsService } from './video-rooms.service';
import { CreateVideoRoomDto } from './dto/create-video-room.dto';
import { FFGetVideoRoomsParams } from 'src/ffl-api/dto/video-room.dto';
import { Request } from 'express';

@Controller('video-rooms')
export class VideoRoomsController {
  constructor(private readonly videoRoomsService: VideoRoomsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createVideoRoomDto: CreateVideoRoomDto) {
    return this.videoRoomsService.create(req, createVideoRoomDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request, @Query() query: FFGetVideoRoomsParams) {
    return this.videoRoomsService.findAll(req, query);
  }

  @Get(':videoRoomId')
  @HttpCode(HttpStatus.OK)
  findOne(@Req() req: Request, @Param('videoRoomId') videoRoomId: string) {
    return this.videoRoomsService.findOne(req, +videoRoomId);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoRoomDto: UpdateVideoRoomDto) {
    return this.videoRoomsService.update(+id, updateVideoRoomDto);
  }
  */

  @Delete(':videoRoomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request, @Param('videoRoomId') videoRoomId: string) {
    return this.videoRoomsService.remove(req, +videoRoomId);
  }

  @Post(':videoRoomId/start-broadcast')
  @HttpCode(HttpStatus.OK)
  startRtmpToCmafBroadcast(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.startRtmpToCmafBroadcast(req, +videoRoomId);
  }

  @Post(':videoRoomId/end-broadcast')
  @HttpCode(HttpStatus.OK)
  endRtmpToCmafBroadcast(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.endRtmpToCmafBroadcast(req, +videoRoomId);
  }

  @Post(':videoRoomId/cancel-broadcast')
  @HttpCode(HttpStatus.OK)
  cancelRtmpToCmafBroadcast(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.cancelRtmpToCmafBroadcast(req, +videoRoomId);
  }

  @Post(':videoRoomId/chat-room')
  @HttpCode(HttpStatus.OK)
  createVideoChatRoom(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.createVideoChatRoom(req, +videoRoomId);
  }

  @Get(':videoRoomId/chat-room')
  @HttpCode(HttpStatus.OK)
  getVideoChatRoom(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.getVideoChatRoom(req, +videoRoomId);
  }

  @Post(':videoRoomId/chat-room/close')
  @HttpCode(HttpStatus.NO_CONTENT)
  closeVideoChatRoom(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.closeVideoChatRoom(req, +videoRoomId);
  }

  @Get(':videoRoomId/chat-room/members')
  @HttpCode(HttpStatus.OK)
  getVideoChatRoomMembers(
    @Req() req: Request,
    @Param('videoRoomId') videoRoomId: string,
  ) {
    return this.videoRoomsService.getVideoChatRoomMembers(req, +videoRoomId);
  }
}
