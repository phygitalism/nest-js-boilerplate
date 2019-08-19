import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserNamePass } from '../common/interfaces/userNamePass.interface';

import { RegisterResDto } from '../common/dto/register/register.res.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUserName(userName: string): Promise<UserNamePass> {
    return this.userRepository.findOne({
      where: {
        userName,
      },
    });
  }

  async createUser(
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<RegisterResDto> {
    const newUser = this.userRepository.create({
      userName,
      firstName,
      lastName,
      password,
    });
    const user = await this.userRepository.save(newUser);
    const { password: pass, ...userData } = user;
    return userData;
  }
}
