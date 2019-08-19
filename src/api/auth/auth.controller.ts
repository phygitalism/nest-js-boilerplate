import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import * as errorMsg from './errors/errorsMsgs';
import * as errorCode from './errors/errorsCodes';

import { UserService } from '../user/user.service';

import { RegisterReqDto } from './dto/register/register.req.dto';
import { RegisterResDto } from '../common/dto/register/register.res.dto';
import { LoginReqDto } from './dto/login/login.req.dto';
import { LoginResDto } from './dto/login/login.res.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'New user registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async addUser(@Body() addUserReq: RegisterReqDto): Promise<RegisterResDto> {
    const user = await this.userService.findOneByUserName(addUserReq.userName);
    if (!!user) {
      throw new HttpException(
        errorMsg.USERNAME_NOT_AVAILABLE,
        errorCode.USERNAME_NOT_AVAILABLE,
      );
    }
    return await this.userService.createUser(
      addUserReq.userName,
      addUserReq.firstName,
      addUserReq.lastName,
      addUserReq.password,
    );
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 201, description: 'User logged in' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() loginReq: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReq.userName);
  }
}
