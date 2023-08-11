import { User } from '../../interfaces/user';
import { api } from './api';

type LoginRequestProps = {
  email: string;
  password: string;
};

type LoginResponseProps = {
  user: any;
  accessToken: string;
};

type RegisterRequestProps = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponseProps = {
  message: string;
};

type GetUserDataRequestProps = {
  accessToken: string;
};

type GetUserDataResponseProps = {
  user: User;
};

async function login({
  email,
  password
}: LoginRequestProps): Promise<LoginResponseProps | null> {
  try {
    const url = `/auth/login`;
    const body = { email, password };
    const { data } = await api.post(url, body);
    return data;
  } catch (error) {
    return null;
  }
}

async function register({
  name,
  email,
  password
}: RegisterRequestProps): Promise<RegisterResponseProps | null> {
  try {
    const url = `/auth/register`;
    const body = { name, email, password };
    const { data: response } = await api.post(url, body);
    return response?.data;
  } catch (error) {
    return null;
  }
}

async function getUserData({
  accessToken
}: GetUserDataRequestProps): Promise<GetUserDataResponseProps | null> {
  const url = `/auth/me`;
  const { data: response } = await api.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response?.data;
}

export const userService = {
  getUserData
};

export const authService = {
  login,
  register,
  getUserData
};
