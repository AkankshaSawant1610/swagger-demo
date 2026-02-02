import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  private users = [{ id: 1, name: 'Akanksha' }];

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users (protected)' })
  @ApiResponse({ status: 200, description: 'Success' })
  getAllUsers() {
    return this.users;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createUser(@Body() dto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...dto };
    this.users.push(newUser);
    return { message: 'User created', data: newUser };
  }
}
