import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user';
import { ERROR_MESSAGE } from './errors/messages';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async getById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictException(ERROR_MESSAGE.USER_ALREADY_EXIST);
    }

    return this.usersRepository.create(data);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.usersRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
