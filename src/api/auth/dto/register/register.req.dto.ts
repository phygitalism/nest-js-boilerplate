import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterReqDto {
  @ApiModelProperty({
    required: true,
    example: 'username',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiModelProperty({
    required: true,
    example: 'John',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty({
    required: true,
    example: 'Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
