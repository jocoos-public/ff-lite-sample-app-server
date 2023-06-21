import { FFAppDto, FFEntityDto } from './common.dto';

export enum FFTranscodingProfileType {
  VIDEO = 'VIDEO',
  THUMBNAIL = 'THUMBNAIL',
  PREVIEW = 'PREVIEW',
  BROADCAST_RTMP = 'BROADCAST_RMTP',
}

export enum FFTranscodingProfileCreatorType {
  SYSTEM = 'SYSTEM',
  APP = 'APP',
}

export enum FFTranscodingProfileRepresentativeType {
  DEFAULT = 'DEFUALT',
  NON_DEFAULT = 'NON_DEFAULT',
}

export interface FFGetTranscodingProfilesParams {
  type?: FFTranscodingProfileType;
  creatorType?: FFTranscodingProfileCreatorType;
  representativeType?: FFTranscodingProfileRepresentativeType;
  name?: string;
  sortBy?:
    | 'CREATED_AT_ASC'
    | 'CREATED_AT_DESC'
    | 'LAST_MODIFIED_AT_ASC'
    | 'LAST_MODIFIED_AT_DESC';
  page: number;
  pageSize: number;
}

export interface FFTranscodingProfileDto extends FFEntityDto {
  type: FFTranscodingProfileType;
  creatorType: FFTranscodingProfileCreatorType;
  representativeType: FFTranscodingProfileRepresentativeType;
  app?: FFAppDto;
  name: string;
  description: string;
  profile: any;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface FFNestedVideoTranscodingProfileDto extends FFEntityDto {
  type: FFTranscodingProfileType;
  name: string;
}

export interface FFNestedPreviewTranscodingProfileDto extends FFEntityDto {
  type: FFTranscodingProfileType;
  name: string;
}

export interface FFNestedThumbnailTranscodingProfileDto extends FFEntityDto {
  type: FFTranscodingProfileType;
  name: string;
}

export interface FFNestedTranscodingProfileDto {
  video: FFNestedVideoTranscodingProfileDto;
  preview: FFNestedPreviewTranscodingProfileDto;
  thumbnail: FFNestedThumbnailTranscodingProfileDto;
}
