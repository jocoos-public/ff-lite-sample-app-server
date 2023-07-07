import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { FflApiService } from '../ffl-api/ffl-api.service';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly fflApiService: FflApiService,
  ) {}

  async create(req: Request, createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const userInfo = await newUser.save();
    /*
    IMPORTANT_TIPS:
      Make sure to sync user info between your app and flipflop
      If a user was created in your app, it is probably a good idea to create
      the corresponding member in flipflop.
      Note: Your app's user maps to your flipflop app's member.
    */
    const memberInfo = await this.fflApiService.createMemeber({
      appUserId: userInfo.id,
      appUserName: userInfo.username,
    });
    console.log('successfully registered user to flipflop');
    console.log(memberInfo);
    return userInfo;
  }

  findAll(req: Request): Promise<Array<User>> {
    return this.userModel.find({}).exec();
  }

  findByUsername(req: Request, username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  findById(req: Request, id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async update(req: Request, id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
    /*
    IMPORTANT_TIPS:
      Make sure to sync user info between your app and flipflop
      If the user info is updated from your app, it is probably a good idea to update
      the corresponding member info in flipflop.
      Note: Your app's user maps to your flipflop app's member.
    */
    this.fflApiService.updateMember(user.id, {});
  }

  async remove(req: Request, id: string) {
    const user = await this.userModel.findOneAndDelete({ _id: id }).exec();
    /*
    IMPORTANT_TIPS:
      Make sure to sync user info between your app and flipflop
      If the user is deleted from your app, it is probably a good idea to delete
      the corresponding member in flipflop.
      Note: Your app's user maps to your flipflop app's member.
    */
    this.fflApiService.deleteMember(user.id);
    return;
  }

  getUserStreamKey(req: Request, id: string) {
    return this.fflApiService.getMemberStreamKey(id);
  }
}
