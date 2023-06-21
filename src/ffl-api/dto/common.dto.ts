export enum FFEntityState {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export interface FFEntityDto {
  id: number;
  state: FFEntityState;
  createdAt?: Date;
  lastModifiedAt?: Date;
}

export interface FFPageDto<T> {
  content: Array<T>;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: false;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface FFAppDto extends FFEntityDto {
  name: string;
}

export enum FFCreatorType {
  USER = 'USER',
  APP = 'APP',
  MEMBER = 'MEMBER',
}

export enum FFAccessLevel {
  PUBLIC = 'PUBLIC',
  APP = 'APP',
  MEMBER = 'MEMBER',
  FRIEND = 'FRIEND',
  FOLLOWER = 'FOLLOWER',
  RESTRICTED = 'RESTRICTED',
  PRIVATE = 'PRIVATE',
}
