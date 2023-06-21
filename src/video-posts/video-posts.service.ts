import { Injectable } from '@nestjs/common';
import {
  FFCreateVideoPostDto,
  FFGetVideoPostsParams,
  FFPartUploadInfoDto,
  FFRequestUploadUrlsDto,
  FFUpdateVideoPostDto,
} from 'src/ffl-api/dto/video-post.dto';
import { FflApiService } from 'src/ffl-api/ffl-api.service';
import { Request } from 'express';

@Injectable()
export class VideoPostsService {
  constructor(private readonly fflApiService: FflApiService) {}

  create(req: Request, createVideoPostDto: FFCreateVideoPostDto) {
    return this.fflApiService.createVideoPost(createVideoPostDto);
  }

  getUploadUrls(
    req: Request,
    videoPostId: number,
    requestUploadUrlDto: FFRequestUploadUrlsDto,
  ) {
    return this.fflApiService.getVideoPostUploadUrls(
      videoPostId,
      requestUploadUrlDto,
    );
  }

  completeUpload(
    req: Request,
    videoPostId: number,
    partUploadListDto: Array<FFPartUploadInfoDto>,
  ) {
    return this.fflApiService.completeVideoPostUpload(
      videoPostId,
      partUploadListDto,
    );
  }

  findAll(req: Request, query?: FFGetVideoPostsParams) {
    return this.fflApiService.getVideoPosts(query);
  }

  findOne(req: Request, id: number) {
    return this.fflApiService.getVideoPost(+id);
  }

  update(req: Request, id: number, updateVideoPostDto: FFUpdateVideoPostDto) {
    return this.fflApiService.updateVideoPost(id, updateVideoPostDto);
  }

  remove(req: Request, id: number) {
    return this.fflApiService.deleteVideoPost(id);
  }
}
