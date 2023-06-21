import { FFEntityDto, FFEntityState } from './common.dto';
import { FFVideoRoomType } from './video-room.dto';

export enum FFStreamKeyState {
  INACTIVE = 'INACTIVE',
  ACTIVE_PREP = 'ACTIVE_PREP',
  ACTIVE = 'ACTIVE',
  ACTIVE_LIVE = 'ACTIVE_LIVE',
  INACTIVE_LIVE = 'INACTIVE_LIVE',
  ACTIVE_LIVE_PREP = 'ACTIVE_LIVE_PREP',
}

export enum FFVideoTranscodingProfileType {
  BROADCAST_RTMP = 'broadcat_rtmp',
}

export interface FFStreamKeyDto {
  id: number;
  state: FFEntityState;
  streamKeyState: FFStreamKeyState;
  app: {
    id: number;
    app: FFEntityState;
    name: string;
  };
  member: {
    id: number;
    state: FFEntityState;
    appUserId: string;
    appUserName: string;
    appUserProfileImgUrl: string;
  };
  videoRoom?: {
    id: number;
    state: FFEntityState;
    type: FFVideoRoomType;
    title: string;
  };
  streamKey: string;
  liveUrl?: string;
  profile: {
    id: number;
    state: FFEntityState;
    type: FFVideoTranscodingProfileType;
    name: string;
    profile: any;
  };
  error?: {
    code?: string;
    message: string;
    occurredAt: string;
  };
  createdAt: string;
  lastModifiedAt: string;
}

export interface FFNestedStreamKeyDto extends FFEntityDto {
  streamKeyState: FFStreamKeyState;
}

export interface FFUpdateStreamKeyDto {
  profileId?: number;
}

export interface FFGetStreamKeysParams {
  memberId?: number;
  appUserId?: string;
  appUserName?: string;
  videoRoomId?: number;
  sortBy?:
    | 'CREATED_AT_ASC'
    | 'CREATED_AT_DESC'
    | 'LAST_MODIFIED_AT_ASC'
    | 'LAST_MODIFIED_AT_DESC';
  page?: number;
  pageSize?: number;
}
