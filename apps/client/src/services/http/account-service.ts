import { IAccount, IAccounts } from '../../interfaces/account';
import { PaginationMetadata } from '../../interfaces/pagination';
import { api } from './api';

type FetchAllProps = {
  userId: string;
  accessToken: string;
  pagination?: PaginationMetadata;
};

type CreateProps = {
  userId: string;
  name: string;
  balance?: number;
  icon?: string;
  accessToken: string;
};

type UpdateProps = {
  userId: string;
  accountId: string;
  name: string;
  balance: number;
  icon: string;
  accessToken: string;
};

type RemoveProps = {
  userId: string;
  accountId: string;
  accessToken: string;
};

async function fetchAll({
  userId,
  accessToken,
  pagination
}: FetchAllProps): Promise<IAccounts> {
  const url = `/users/${userId}/accounts?page=${pagination?.page}&items=${pagination?.items}`;
  const { data: response } = await api.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response?.data;
}

async function create({
  userId,
  name,
  balance,
  icon,
  accessToken
}: CreateProps): Promise<any> {
  try {
    const url = `/users/${userId}/accounts`;
    const body = { userId, name, balance, icon };
    const { data: response } = await api.post(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

async function update({
  userId,
  accountId,
  name,
  balance,
  icon,
  accessToken
}: UpdateProps): Promise<any> {
  try {
    const url = `/users/${userId}/accounts/${accountId}`;
    const body = { name, balance, icon };
    const { data: response } = await api.patch(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

async function remove({
  userId,
  accountId,
  accessToken
}: RemoveProps): Promise<IAccount[]> {
  const url = `/users/${userId}/accounts/${accountId}`;
  const { data: response } = await api.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response?.data;
}

export const accountService = {
  fetchAll,
  create,
  update,
  remove
};
