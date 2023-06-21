import { ForbiddenException, Injectable } from '@nestjs/common';
import { FFGetVideoRoomsParams } from 'src/ffl-api/dto/video-room.dto';
import { FflApiService } from 'src/ffl-api/ffl-api.service';
import { CreateVideoRoomDto } from './dto/create-video-room.dto';
import { Request } from 'express';

@Injectable()
export class VideoRoomsService {
  constructor(private readonly fflApiService: FflApiService) {}

  create(req: Request, createVideoRoomDto: CreateVideoRoomDto) {
    const appUserId = req['user'].sub;
    return this.fflApiService.createVideoRoom({
      appUserId,
      ...createVideoRoomDto,
    });
  }

  findAll(req: Request, query?: FFGetVideoRoomsParams) {
    return this.fflApiService.getVideoRooms(query);
  }

  findOne(req: Request, videoRoomId: number) {
    return this.fflApiService.getVideoRoom(videoRoomId);
  }

  async remove(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoRooms cannot be deleted by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with VideoRoom deletion
    return await this.fflApiService.deleteVideoRoom(videoRoomId);
  }

  async startRtmpToCmafBroadcast(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoRoom broadcast cannot be started by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with starting VideoRoom broadcast
    return this.fflApiService.startRtmpToCmafBroadcast(videoRoomId);
  }

  async endRtmpToCmafBroadcast(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoRoom broadcast cannot be ended by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with ending VideoRoom broadcast
    return this.fflApiService.stopRtmpToCmafBroadcast(videoRoomId);
  }

  async cancelRtmpToCmafBroadcast(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoRoom broadcast cannot be cancelled by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with cancelling VideoRoom broadcast
    return this.fflApiService.cancelRtmpToCmafBroadcast(videoRoomId);
  }

  async createVideoChatRoom(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoChatRooms cannot be created by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with VideoChatRoom creation
    return await this.fflApiService.createVideoChatRoom(videoRoomId);
  }

  getVideoChatRoom(req: Request, videoRoomId: number) {
    return this.fflApiService.getVideoChatRoom(videoRoomId);
  }

  async closeVideoChatRoom(req: Request, videoRoomId: number) {
    /*
    IMPORTANT_TIPS:
      It may be a good idea to check if the requester owns the VideoRoom first so that
      VideoChatRooms cannot be closed by random users.
      Note: Your app user's id corresponds to your flipflop app's members' appUserId
    */
    // extract requester's id from request
    const appUserId = req['user'].sub;
    // get VideoRoom info from flipflop
    const videoRoom = await this.fflApiService.getVideoRoom(videoRoomId);
    // check if requester owns the VideoRoom
    if (videoRoom.member.appUserId !== appUserId) {
      throw new ForbiddenException();
    }
    // proceeed with VideoChatRoom close
    return await this.fflApiService.closeVideoChatRoom(videoRoomId);
  }

  getVideoChatRoomMembers(req: Request, videoRoomId: number) {
    return this.fflApiService.getVideoChatRoomMembers(videoRoomId);
  }
}
