import { Injectable, Inject } from '@nestjs/common';
import type { IUsersRepository } from './repositories/users.repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async create(data: Partial<User>): Promise<User> {
    return this.usersRepository.create(data);
  }
}
