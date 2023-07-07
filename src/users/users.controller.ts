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
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../decorators/public.decorator';
import { Request } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(req, createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request) {
    return this.usersService.findAll(req);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.findById(req, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req, id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.remove(req, id);
  }

  @Get(':id/stream-key')
  @HttpCode(HttpStatus.OK)
  getUserStreamKey(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.getUserStreamKey(req, id);
  }
}
