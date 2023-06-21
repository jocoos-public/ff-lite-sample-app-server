import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request, @Body() signInDto: Record<string, any>) {
    return this.authService.login(req, signInDto.username, signInDto.password);
  }

  @Post('chat-token')
  @HttpCode(HttpStatus.OK)
  issueChatToken(@Req() req: Request) {
    return this.authService.issueChatToken(req);
  }
}
