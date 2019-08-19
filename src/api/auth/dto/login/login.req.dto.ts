import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginReqDto {
  @ApiModelProperty({
    required: true,
    example: 'username',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiModelProperty({
    required: true,
    example: '12345678efamk',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
