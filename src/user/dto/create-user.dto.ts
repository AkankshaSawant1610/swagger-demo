import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Akanksha',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'akanksha@gmail.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 25,
    required: false,
  })
  @IsOptional()
  age?: number;
}
