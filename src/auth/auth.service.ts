import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'akanksha', password: bcrypt.hashSync('123456', 8) },
  ];

  async login(dto: { username: string; password: string }) {
    const user = this.users.find(u => u.username === dto.username);
    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}
