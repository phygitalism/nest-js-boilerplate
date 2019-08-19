import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as errorMsg from './errors/errorsMsgs';
import * as errorCode from './errors/errorsCodes';

import { UserService } from '../user/user.service';

import { encryptPassword } from '../../service/password.crypt';

import { UserNamePass } from '../common/interfaces/userNamePass.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<UserNamePass> {
    const user = await this.userService.findOneByUserName(userName);
    if (!user) {
      throw new HttpException(
        errorMsg.USER_NOT_FOUND,
        errorCode.USER_NOT_FOUND,
      );
    }
    const cryptPass: string = encryptPassword(pass);
    if (user.password === cryptPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userName: string): Promise<{ accessToken: string }> {
    const payload = {
      username: userName,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
