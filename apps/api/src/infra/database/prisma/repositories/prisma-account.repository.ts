import { Injectable } from '@nestjs/common';

import { CreateAccountDto } from '@modules/account/dtos/create-account.dto';
import { UpdateAccountDto } from '@modules/account/dtos/update-account.dto';
import { Account } from '@modules/account/entities/account';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Account[]> {
    return this.prisma.account.findMany();
  }

  async findById(id: string): Promise<Account> {
    return this.prisma.account.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  async create(data: CreateAccountDto): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }

  async update(id: string, data: UpdateAccountDto): Promise<Account> {
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Account> {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
