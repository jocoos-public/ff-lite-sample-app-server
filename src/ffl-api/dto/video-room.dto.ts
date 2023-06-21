import {
  FFAccessLevel,
  FFAppDto,
  FFCreatorType,
  FFEntityDto as FFEntityDto,
} from './common.dto';
import { FFNestedMemberDto } from './member.dto';
import { FFNestedStreamKeyDto } from './stream-key.dto';

export enum FFVideoRoomState {
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  LIVE = 'LIVE',
  LIVE_INACTIVE = 'LIVE_INACTIVE',
  ENDED = 'ENDED',
  ARCHIVED = 'ARCHIVED',
}

export enum FFVideoRoomType {
  BROADCAST_RTMP = 'BROADCAST_RTMP',
  BROADCAST_WEBRTC = 'BROADCAST_WEBRTC',
  WEBINAR = 'WEBINAR',
  VIDEO_CONFERENCE = 'VIDEO_CONFERENCE',
  SURVEILLANCE = 'SURVEILLANCE',
}

export enum FFVideoFormat {
  CMAF = 'cmaf',
  UNDEFINED = 'undefined',
}

export interface FFVideoRoomDto extends FFEntityDto {
  videoRoomState: FFVideoRoomState; // 상태	VideoRoom 상태 설명 참고
  type: FFVideoRoomType; // 타입	BROADCAST_RTMP, BROADCAST_WEBRTC, WEBINAR, VIDEO_CONFERENCE SURVEILLANCE
  format: FFVideoFormat; // 비디오 형식	CMAF, UNDEFINED
  app: FFAppDto;
  member: FFNestedMemberDto;
  creatorType: FFCreatorType; // 생성자 타입	USER, APP, MEMBER
  creatorId: number; // 생성자 ID
  accessLevel: FFAccessLevel; //	액세스 레벨	PUBLIC, APP, MEMBER, FRIEND, FOLLOWER, RESTRICTED, PRIVATE
  title: string; // 비디오룸 제목
  description: string; // 비디오룸 설명
  scheduledAt?: Date; // 스트리밍 방송 시작 예상 일시
  cancelledAt?: Date; // 스트리밍 방송 취소 일시
  liveStartedAt?: Date; // 스트리밍 방송 송출 시작 일시
  liveEndedAt?: Date; // 스트리밍 방송 송출 종료 일시
  streamKey?: FFNestedStreamKeyDto; // 스트리밍 방송 중일 경우 StreamKey 정보
  liveUrl?: string; // 스트리밍 방송 중일 경우 시청 가능한 URL
  chat: {
    videoKey: string; // VideoRoom ID	Chat SDK를 통해 채팅룸 WebSocket 연결시 필수 파라메터
    channelKey: string; // 채팅룸 고유 식별자	Chat SDK를 통해 채팅룸 WebSocket 연결시 필수 파라메터
    createdAt?: Date; // 채팅룸 생성 일시
    closedAt?: Date; // 채팅룸 종료 일시
  };
  stats: {
    totalMemberWhitelistCount: number; // 총 Member Whitelist 개수
  };
  createdBy: {
    id: number;
    username: string;
    email: string;
  };
  lastModifiedBy: {
    id: number;
    username: string;
    email: string;
  };
}

export interface FFNestedVideoRoomDto extends FFEntityDto {
  type: FFVideoRoomType;
  title: string;
}

export interface FFCreateVideoRoomDto {
  appUserId: string | number;
  type: FFVideoRoomType;
  title?: string;
  description?: string;
  accessLevel?: FFAccessLevel;
  scheduledAt: Date;
}

export interface FFGetVideoRoomsParams {
  memberId?: number;
  keyword?: string;
  videoRoomState?: FFVideoRoomState;
  type?: FFVideoRoomType;
  accessLevel?: FFAccessLevel;
  sortBy?:
    | 'CREATED_AT_ASC'
    | 'CREATED_AT_DESC'
    | 'LAST_MODIFIED_AT_ASC'
    | 'LAST_MODIFIED_AT_DESC';
  page?: number;
  pageSize?: number;
}

export interface FFVideoChatRoomDto {
  channelKey: string;
  totalChatMessageCount: number;
  totalChatMemberCount: number;
  closed: boolean;
  createdAt: Date;
}

export interface FFGetVideoChatRoomMembersParams {
  cursor: number;
  count: number;
}

export interface FFVideoChatRoomMemberDto {
  appUserId: number;
  appUserName?: string;
  appUserProfileImgUrl?: string;
  joinedAt: Date;
}
