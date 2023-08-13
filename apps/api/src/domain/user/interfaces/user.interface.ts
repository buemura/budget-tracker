import { User } from '../entities/user';

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: User;
}
