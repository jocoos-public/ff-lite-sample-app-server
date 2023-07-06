import { FFAccessLevel } from '../../ffl-api/dto/common.dto';
import { FFVideoRoomType } from '../../ffl-api/dto/video-room.dto';

export interface CreateVideoRoomDto {
  type: FFVideoRoomType;
  title?: string;
  description?: string;
  accessLevel?: FFAccessLevel;
  scheduledAt: Date;
}
