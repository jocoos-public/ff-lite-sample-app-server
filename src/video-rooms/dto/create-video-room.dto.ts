import { FFAccessLevel } from 'src/ffl-api/dto/common.dto';
import { FFVideoRoomType } from 'src/ffl-api/dto/video-room.dto';

export interface CreateVideoRoomDto {
  type: FFVideoRoomType;
  title?: string;
  description?: string;
  accessLevel?: FFAccessLevel;
  scheduledAt: Date;
}
