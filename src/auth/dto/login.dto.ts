import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'akanksha', description: 'Username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
