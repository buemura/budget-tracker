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

async function login({
  email,
  password
}: LoginRequestProps): Promise<LoginResponseProps | null> {
  try {
    const url = `/auth/login`;
    const body = { email, password };
    const { data: response } = await api.post(url, body);
    return response?.data;
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

export const authService = {
  login,
  register
};
