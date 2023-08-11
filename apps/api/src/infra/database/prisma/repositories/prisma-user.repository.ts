import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@modules/user/dtos/create-user.dto';
import { UpdateUserDto } from '@modules/user/dtos/update-user.dto';
import { User } from '@modules/user/entities/user';
import { UserRepository } from '@modules/user/repositories/user.repository';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
