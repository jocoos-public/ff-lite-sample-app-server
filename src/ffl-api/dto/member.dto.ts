import { FFAppDto, FFEntityDto, FFEntityState } from './common.dto';

export interface FFGetMembersParams {
  appUserId?: string;
  appUserName?: string;
  sortBy?:
    | 'CREATED_AT_ASC'
    | 'CREATED_AT_DESC'
    | 'LAST_MODIFIED_AT_ASC'
    | 'LAST_MODIFIED_AT_DESC'
    | 'APP_USER_ID_ASC'
    | 'APP_USER_ID_DESC';
  page?: number;
  pageSize?: number;
}

export interface FFMemberDto extends FFEntityDto {
  id: number;
  state: FFEntityState;
  app: FFAppDto;
  appUserId: string;
  appUserName?: string;
  appUserProfileImgUrl?: string;
}

export interface FFCreateMemberDto {
  appUserId: string;
  appUserName?: string;
  appUserProfileImgUrl?: string;
}

export interface FFUpdateMemberDto {
  appUserName?: string;
  appUserProfileImgUrl?: string;
}

export interface FFNestedMemberDto extends FFEntityDto {
  appUserId: string;
  appUserName?: string;
  appUserProfileImgUrl?: string;
}
