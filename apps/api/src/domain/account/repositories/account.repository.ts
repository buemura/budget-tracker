import { CreateAccountDto } from '../../../api/account/dtos/create-account.dto';
import { UpdateAccountDto } from '../../../api/account/dtos/update-account.dto';
import { Account } from '../entities/account';

export abstract class AccountRepository {
  abstract findMany(): Promise<Account[]>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByUserId(userId: string): Promise<Account[]>;
  abstract create(data: CreateAccountDto): Promise<Account>;
  abstract update(id: string, data: UpdateAccountDto): Promise<Account | null>;
  abstract remove(id: string): Promise<Account | null>;
}
