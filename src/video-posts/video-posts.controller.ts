import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Req,
} from '@nestjs/common';
import { VideoPostsService } from './video-posts.service';
import {
  FFCreateVideoPostDto,
  FFGetVideoPostsParams,
  FFPartUploadInfoDto,
  FFRequestUploadUrlsDto,
  FFUpdateVideoPostDto,
} from '../ffl-api/dto/video-post.dto';
import { Request } from 'express';
@Controller('video-posts')
export class VideoPostsController {
  constructor(private readonly videoPostsService: VideoPostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req: Request,
    @Body() createVideoPostDto: FFCreateVideoPostDto,
  ) {
    return this.videoPostsService.create(req, createVideoPostDto);
  }

  @Post(':videoPostId/request-upload-urls')
  @HttpCode(HttpStatus.OK)
  requestUploadUrl(
    @Req() req: Request,
    @Param('videoPostId') videoPostId: string,
    requestUploadUrlsDto: FFRequestUploadUrlsDto,
  ) {
    return this.videoPostsService.getUploadUrls(
      req,
      +videoPostId,
      requestUploadUrlsDto,
    );
  }

  @Post(':videoPostId/complete-upload')
  @HttpCode(HttpStatus.NO_CONTENT)
  completeUpload(
    @Req() req: Request,
    @Param('videoPostId') videoPostId: string,
    partUploadListDto: Array<FFPartUploadInfoDto>,
  ) {
    return this.videoPostsService.completeUpload(
      req,
      +videoPostId,
      partUploadListDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request, @Query() query?: FFGetVideoPostsParams) {
    return this.videoPostsService.findAll(req, query);
  }

  @Get(':videoPostId')
  @HttpCode(HttpStatus.OK)
  findOne(@Req() req: Request, @Param('videoPostId') videoPostId: string) {
    return this.videoPostsService.findOne(req, +videoPostId);
  }

  @Patch(':videoPostId')
  @HttpCode(HttpStatus.OK)
  update(
    @Req() req: Request,
    @Param('videoPostId') videoPostId: string,
    @Body() updateVideoPostDto: FFUpdateVideoPostDto,
  ) {
    return this.videoPostsService.update(req, +videoPostId, updateVideoPostDto);
  }

  @Delete(':videoPostId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request, @Param('videoPostId') videoPostId: string) {
    return this.videoPostsService.remove(req, +videoPostId);
  }
}
