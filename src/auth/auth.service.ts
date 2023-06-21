import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FflApiService } from 'src/ffl-api/ffl-api.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly fflApiService: FflApiService,
  ) {}

  async login(req: Request, username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(req, username);
    console.log(pass, user?.password);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    try {
      const fflTokens = await this.fflApiService.loginAsMember({
        appUserId: user.id,
        appUserName: username,
      });
      return {
        accessToken: await this.jwtService.signAsync(payload),
        fflTokens,
      };
    } catch (err) {
      throw new UnauthorizedException('Failed to obtain ffl credentials');
    }
  }

  issueChatToken(req: Request) {
    return this.fflApiService.issueMemberChatToken(req['user'].sub);
  }
}
