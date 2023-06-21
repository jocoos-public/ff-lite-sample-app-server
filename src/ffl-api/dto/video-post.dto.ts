import {
  FFAccessLevel,
  FFAppDto,
  FFCreatorType,
  FFEntityDto as FFEntityDto,
} from './common.dto';
import { FFNestedMemberDto } from './member.dto';
import { FFNestedTranscodingProfileDto } from './transcoding-profile.dto';
import { FFNestedVideoRoomDto } from './video-room.dto';

export enum FFVideoPostState {
  CREATED = 'CREATED',
  UPLOADED = 'UPLOADED',
  QUEUED = 'QUEUED',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED_UPLOAD = 'FAILED_UPLOAD',
  FAILED_QUEUING = 'FAILED_QUEUING',
  FAILED_PROCESSING = 'FAILED_PROCESSING',
}

export enum FFVideoPostType {
  LIVE_RECORDED = 'LIVE_RECORDED',
  PRE_RECORDED = 'PRE_RECORDED',
}

export enum FFFileType {
  VIDEO_POST_SRC = 'VIDEO_POST_SRC',
}

export interface FFDrmDto {
  isProtected: boolean;
  contentId?: string;
}

export interface FFFileDto extends FFEntityDto {
  type: FFFileType;
  contentType: string;
  size: number;
  originalFileName: string;
  url: string;
  drm: FFDrmDto;
}

export enum FFFileFormat {
  MP4 = 'MP4',
  CMAF_HLS = 'CMAF_HLS',
  CMAF_MPEG_DASH = 'CMAF_MPEG_DASH',
}

export interface FFFileSummaryDto {
  format: FFFileFormat;
  size: number;
  url: string;
  masterPlaylistFileId: number;
  masterPlaylistFileIds: Array<number>;
  mediaSegmentFileIds: Array<number>;
}

export interface FFFilesDto {
  src: FFFileDto;
  processed: Array<FFFileDto>;
  processedSummaries: Array<FFFileSummaryDto>;
  preview: FFFileDto;
  thumbnail: FFFileDto;
}

export interface FFVideoPostStatDto {
  totalMemberWhitelistCount: number;
}

export interface FFCreateVideoPostDto {
  appUserId: string;
  title?: string;
  description?: string;
  accessLevel?: FFAccessLevel;
  videoProfileId?: number;
  previewProfileId?: number;
  thumbnailProfileId?: number;
  customData?: Map<string, any>;
}

export interface FFVideoPostDto extends FFEntityDto {
  videoPostState: FFVideoPostState;
  type: FFVideoPostType;
  accessLevel: FFAccessLevel;
  app: FFAppDto;
  member: FFNestedMemberDto;
  creatorType: FFCreatorType;
  creatorId: number;
  videoRoom?: FFNestedVideoRoomDto;
  title: string;
  description?: string;
  transcodingProfile: FFNestedTranscodingProfileDto;
  file: FFFilesDto;
  customData?: Map<string, any>;
  stats: FFVideoPostState;
  uploadedAt: Date;
  uploadFailedAt: Date;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface FFUpdateVideoPostDto {
  accessLevel?: FFAccessLevel;
  title?: string;
  description?: string;
  customData?: Map<string, any>;
  videoProfileId?: number;
  previewProfileId?: number;
  thumbnailProfileId?: number;
}

export interface FFRequestUploadUrlsDto {
  filename: string;
  size: number;
  contentType: string;
  multipartCount?: number;
}

export interface FFUploadUrlsDto {
  partNumber: number;
  uplaodUrl: string;
}

export interface FFPartUploadInfoDto {
  partNumber: number;
  eTag: string;
}

export interface FFGetVideoPostsParams {
  memberId?: number;
  appUserId?: string;
  videoPostState?: FFVideoPostState;
  acccessLevel?: FFAccessLevel;
  keyword?: string;
  sortBy:
    | 'CREATED_AT_ASC'
    | 'CREATED_AT_DESC'
    | 'LAST_MODIFIED_AT_ASC'
    | 'LAST_MODIFIED_AT_DESC';
  page?: number;
  pageSize?: number;
}
