import { User } from '../entities/user';
import { ICreateUser, IUpdateUser } from '../interfaces/user.interface';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract create(data: ICreateUser): Promise<User>;
  abstract update(id: string, data: IUpdateUser): Promise<User>;
  abstract remove(id: string): Promise<User>;
}
