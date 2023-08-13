import { IInvestment } from '../../interfaces/investment';
import { PaginationMetadata } from '../../interfaces/pagination';
import { api } from './api';

type FetchManyProps = {
  accessToken: string;
  pagination?: PaginationMetadata;
};

type CreateProps = {
  userId: string;
  accountId: string;
  category: string;
  ticker: string;
  type: string;
  accessToken: string;
};

type UpdateProps = {
  userId: string;
  investmentId: string;
  accountId: string;
  category: string;
  ticker: string;
  type: string;
  accessToken: string;
};

type UpdatePricesProps = {
  userId: string;
  accessToken: string;
};

async function fetchMany({
  accessToken,
  pagination
}: FetchManyProps): Promise<IInvestment[]> {
  const url = `/investments?page=${pagination?.page}&items=${pagination?.items}`;
  const { data: response } = await api.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response?.data;
}

async function create({
  userId,
  accountId,
  category,
  ticker,
  type,
  accessToken
}: CreateProps): Promise<any> {
  try {
    const url = `/users/${userId}/investments`;
    const body = { accountId, category, ticker, type };
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
  investmentId,
  accountId,
  category,
  ticker,
  type,
  accessToken
}: UpdateProps): Promise<any> {
  try {
    const url = `/users/${userId}/investments/${investmentId}`;
    const body = { accountId, category, ticker, type };
    const { data: response } = await api.patch(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

async function updatePrices({
  userId,
  accessToken
}: UpdatePricesProps): Promise<any> {
  try {
    const url = `/users/${userId}/investments-update`;
    const { data: response } = await api.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

export const investmentService = {
  fetchMany,
  create,
  update,
  updatePrices
};
