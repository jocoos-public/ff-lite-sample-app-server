import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'src/env-vars';
import { FFIssueGuestChatTokenDto, FFChatTokenDto } from './dto/chat.dto';
import { FFPageDto } from './dto/common.dto';
import { FFLoginDto } from './dto/login.dto';
import * as Gaxios from 'gaxios';
import {
  FFCreateMemberDto,
  FFUpdateMemberDto,
  FFMemberDto,
  FFGetMembersParams,
} from './dto/member.dto';
import {
  FFStreamKeyDto,
  FFGetStreamKeysParams,
  FFUpdateStreamKeyDto,
} from './dto/stream-key.dto';
import {
  FFCreateVideoRoomDto,
  FFVideoRoomDto,
  FFGetVideoRoomsParams,
  FFVideoChatRoomDto,
  FFGetVideoChatRoomMembersParams,
  FFVideoChatRoomMemberDto,
} from './dto/video-room.dto';
import {
  FFGetTranscodingProfilesParams,
  FFTranscodingProfileDto,
} from './dto/transcoding-profile.dto';
import {
  FFCreateVideoPostDto,
  FFGetVideoPostsParams,
  FFPartUploadInfoDto,
  FFRequestUploadUrlsDto,
  FFUpdateVideoPostDto,
  FFUploadUrlsDto,
  FFVideoPostDto,
} from './dto/video-post.dto';

@Injectable()
export class FflApiService {
  private credentials: string;
  private baseUrl: string;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get<string>(EnvVars.FFL_API_BASE_URL);
    const appKey = config.get<string>(EnvVars.FFL_APP_API_KEY);
    const appSecret = config.get<string>(EnvVars.FFL_APP_API_SECRET);
    this.credentials = `Basic ${Buffer.from(`${appKey}:${appSecret}`).toString(
      'base64',
    )}`;
  }

  async loginAsGuest(): Promise<FFLoginDto> {
    const res = await Gaxios.request<FFLoginDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/members/login-as-guest`,
    });
    return res.data;
  }

  async createMemeber(
    createMemberDto: FFCreateMemberDto,
  ): Promise<FFMemberDto> {
    const res = await Gaxios.request<FFMemberDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/members`,
      body: JSON.stringify(createMemberDto),
    });
    return res.data;
  }

  async loginAsMember(createMemberDto: FFCreateMemberDto): Promise<FFLoginDto> {
    const res = await Gaxios.request<FFLoginDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/members/login`,
      body: JSON.stringify(createMemberDto),
    });
    return res.data;
  }

  async updateMember(
    appUserId: string,
    updateMemberDto: FFUpdateMemberDto,
  ): Promise<FFMemberDto> {
    const res = await Gaxios.request<FFMemberDto>({
      method: 'PATCH',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/members/${appUserId}`,
      body: JSON.stringify(updateMemberDto),
    });
    return res.data;
  }

  async getMembers(
    query?: FFGetMembersParams,
  ): Promise<FFPageDto<FFMemberDto>> {
    const res = await Gaxios.request<FFPageDto<FFMemberDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/members`,
      params: query,
    });
    return res.data;
  }

  async deleteMember(appUserId: string): Promise<void> {
    await Gaxios.request<FFMemberDto>({
      method: 'DELETE',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/members/${appUserId}`,
    });
    return;
  }

  async getMemberStreamKey(appUserId: string): Promise<FFStreamKeyDto> {
    const res = await Gaxios.request<FFStreamKeyDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/members/${appUserId}/stream-key`,
    });
    return res.data;
  }

  async getStreamKey(id: number): Promise<FFStreamKeyDto> {
    const res = await Gaxios.request<FFStreamKeyDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/stream-keys/${id}`,
    });
    return res.data;
  }

  async getStreamKeys(
    query?: FFGetStreamKeysParams,
  ): Promise<FFPageDto<FFStreamKeyDto>> {
    const res = await Gaxios.request<FFPageDto<FFStreamKeyDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/stream-keys`,
      params: query,
    });
    return res.data;
  }

  async updateStreamKey(
    id: number,
    updateStreamKeyDto: FFUpdateStreamKeyDto,
  ): Promise<FFStreamKeyDto> {
    const res = await Gaxios.request<FFStreamKeyDto>({
      method: 'PATCH',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/stream-keys/${id}`,
      body: JSON.stringify(updateStreamKeyDto),
    });
    return res.data;
  }

  async reissueStreamKey(id: number): Promise<FFStreamKeyDto> {
    const res = await Gaxios.request<FFStreamKeyDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/stream-keys/${id}/reissue`,
    });
    return res.data;
  }

  async createVideoRoom(
    createVideoRoomDto: FFCreateVideoRoomDto,
  ): Promise<FFVideoRoomDto> {
    const res = await Gaxios.request<FFVideoRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-rooms`,
      body: JSON.stringify(createVideoRoomDto),
    });
    return res.data;
  }

  /*
  async updateVideoRoom(updateVideoRoomDto: UpdateVideoRoomDto): Promise<VideoRoomDto> {

  }
  */

  async getVideoRoom(id: number): Promise<FFVideoRoomDto> {
    const res = await Gaxios.request<FFVideoRoomDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-rooms/${id}`,
    });
    return res.data;
  }

  async getVideoRooms(
    query?: FFGetVideoRoomsParams,
  ): Promise<FFPageDto<FFVideoRoomDto>> {
    const res = await Gaxios.request<FFPageDto<FFVideoRoomDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-rooms`,
      params: query,
    });
    return res.data;
  }

  async deleteVideoRoom(id: number): Promise<void> {
    await Gaxios.request<void>({
      method: 'DELETE',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-rooms/${id}`,
    });
    return;
  }

  async startRtmpToCmafBroadcast(videoRoomId: number): Promise<FFVideoRoomDto> {
    const res = await Gaxios.request<FFVideoRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/video-rooms/${+videoRoomId}/rtmp-broadcast/state/live`,
    });
    return res.data;
  }

  async stopRtmpToCmafBroadcast(videoRoomId: number): Promise<FFVideoRoomDto> {
    const res = await Gaxios.request<FFVideoRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/video-rooms/${+videoRoomId}/rtmp-broadcast/state/ended`,
    });
    return res.data;
  }

  async cancelRtmpToCmafBroadcast(
    videoRoomId: number,
  ): Promise<FFVideoRoomDto> {
    const res = await Gaxios.request<FFVideoRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/video-rooms/${+videoRoomId}/rtmp-broadcast/state/cancelled`,
    });
    return res.data;
  }

  async issueGuestChatToken(
    issueGuestChatToken: FFIssueGuestChatTokenDto,
  ): Promise<FFChatTokenDto> {
    const res = await Gaxios.request<FFChatTokenDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/members/guest-chat-tokens`,
      body: JSON.stringify(issueGuestChatToken),
    });
    return res.data;
  }

  async issueMemberChatToken(appUserId: string): Promise<FFChatTokenDto> {
    const res = await Gaxios.request<FFChatTokenDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/members/${appUserId}/chat-tokens`,
    });
    return res.data;
  }

  async createVideoChatRoom(videoRoomId: number): Promise<FFVideoChatRoomDto> {
    const res = await Gaxios.request<FFVideoChatRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-rooms/${videoRoomId}/chat-room`,
    });
    return res.data;
  }

  async getVideoChatRoom(videoRoomId: number): Promise<FFVideoChatRoomDto> {
    const res = await Gaxios.request<FFVideoChatRoomDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseUrl: this.baseUrl,
      url: `/video-rooms/${videoRoomId}/chat-room`,
    });
    return res.data;
  }

  async closeVideoChatRoom(videoRoomId: number): Promise<FFVideoChatRoomDto> {
    const res = await Gaxios.request<FFVideoChatRoomDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/video-rooms/${videoRoomId}/chat-room/close`,
    });
    return res.data;
  }

  async getVideoChatRoomMembers(
    videoRoomId: number,
    query?: FFGetVideoChatRoomMembersParams,
  ): Promise<FFPageDto<FFVideoChatRoomMemberDto>> {
    const res = await Gaxios.request<FFPageDto<FFVideoChatRoomMemberDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/video-rooms/${videoRoomId}/chat-room/members`,
      params: query,
    });
    return res.data;
  }

  async getTranscodingProfiles(
    query?: FFGetTranscodingProfilesParams,
  ): Promise<FFPageDto<FFTranscodingProfileDto>> {
    const res = await Gaxios.request<FFPageDto<FFTranscodingProfileDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/transcoding-profiles`,
      params: query,
    });
    return res.data;
  }

  async getTranscodingProfile(id: number): Promise<FFTranscodingProfileDto> {
    const res = await Gaxios.request<FFTranscodingProfileDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/transcoding-profiles/${id}`,
    });
    return res.data;
  }

  async createVideoPost(
    createVideoPostDto: FFCreateVideoPostDto,
  ): Promise<FFVideoPostDto> {
    const res = await Gaxios.request<FFVideoPostDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-posts`,
      body: JSON.stringify(createVideoPostDto),
    });
    return res.data;
  }

  async getVideoPostUploadUrls(
    id: number,
    requestUploadUrlsDto: FFRequestUploadUrlsDto,
  ): Promise<FFUploadUrlsDto> {
    const res = await Gaxios.request<FFUploadUrlsDto>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-posts/${id}/src-file/request-upload-urls`,
      body: JSON.stringify(requestUploadUrlsDto),
    });
    return res.data;
  }

  async completeVideoPostUpload(
    id: number,
    partUploadListDto: Array<FFPartUploadInfoDto>,
  ): Promise<void> {
    await Gaxios.request<void>({
      method: 'POST',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
      url: `/video-posts/${id}/src-file/complete-upload`,
      body: JSON.stringify(partUploadListDto),
    });
    return;
  }

  async getVideoPosts(
    query?: FFGetVideoPostsParams,
  ): Promise<FFPageDto<FFVideoPostDto>> {
    const res = await Gaxios.request<FFPageDto<FFVideoPostDto>>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/video-posts`,
      params: query,
    });
    return res.data;
  }

  async getVideoPost(id: number): Promise<FFVideoPostDto> {
    const res = await Gaxios.request<FFVideoPostDto>({
      method: 'GET',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/video-posts/${id}`,
    });
    return res.data;
  }

  async updateVideoPost(
    id: number,
    updateVideoPostDto: FFUpdateVideoPostDto,
  ): Promise<FFVideoPostDto> {
    const res = await Gaxios.request<FFVideoPostDto>({
      method: 'PATCH',
      headers: {
        Authorization: this.credentials,
        'Content-Type': 'application/json',
      },
      baseUrl: this.baseUrl,
      url: `/video-posts/${id}`,
      body: JSON.stringify(updateVideoPostDto),
    });
    return res.data;
  }

  async deleteVideoPost(id: number): Promise<void> {
    await Gaxios.request<void>({
      method: 'DELETE',
      headers: {
        Authorization: this.credentials,
      },
      baseURL: this.baseUrl,
      url: `/video-posts/${id}`,
    });
    return;
  }
}
