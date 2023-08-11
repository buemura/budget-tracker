import { User } from '../../interfaces/user';
import { api } from './api';

type GetUserDataRequestProps = {
  userId: string;
  accessToken: string;
};

type GetUserDataResponseProps = {
  user: User;
};

async function getUserData({
  userId,
  accessToken
}: GetUserDataRequestProps): Promise<GetUserDataResponseProps | null> {
  const url = `/users/${userId}`;
  const { data: response } = await api.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response?.data;
}

export const userService = {
  getUserData
};
