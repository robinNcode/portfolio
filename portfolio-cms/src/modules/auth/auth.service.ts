import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findByEmail(email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Note: comparePassword is a method on the schema, but we might need to cast to UserDocument or call bcrypt directly
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: (user as any)._id, email: user.email, role: user.role };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async ensureAdminExists(email: string, pass: string): Promise<void> {
    const exists = await this.usersService.findByEmail(email);
    if (!exists) {
      await this.usersService.create({
        email,
        password: pass,
        role: 'admin',
        name: 'Robin Admin',
      });
      console.log('[Auth] Admin user seeded:', email);
    }
  }
}
