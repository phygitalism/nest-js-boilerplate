import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiModelProperty({
    required: true,
    example: 'q90weqwe9wqe.adad.asda',
    description: 'JWT token',
    type: String,
  })
  accessToken: string;
}
