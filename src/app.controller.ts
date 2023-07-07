import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @Public()
  @HttpCode(HttpStatus.OK)
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
