import { IExpense } from "@interfaces/expense";
import { PaginationMetadata } from "@interfaces/pagination";
import { api } from "./api";

type FetchAllProps = {
  userId: string;
  accessToken: string;
  pagination?: PaginationMetadata;
};

type CreateProps = {
  title: string;
  userId: string;
  imageUrl: string;
  accessToken: string;
};

type UpdateProps = {
  userId: string;
  expenseId: string;
  title: string;
  imageUrl: string;
  isPaid: boolean;
  isActive: boolean;
  accessToken: string;
};

async function fetchAll({
  userId,
  accessToken,
  pagination,
}: FetchAllProps): Promise<IExpense[]> {
  const url = `/users/${userId}/expenses?page=${pagination?.page}&items=${pagination?.items}`;
  const { data: response } = await api.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
}

async function create({
  title,
  userId,
  imageUrl,
  accessToken,
}: CreateProps): Promise<any> {
  try {
    const url = `/users/${userId}/expenses`;
    const body = { title, userId, imageUrl };
    const { data: response } = await api.post(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

async function update({
  userId,
  expenseId,
  title,
  imageUrl,
  isPaid,
  isActive,
  accessToken,
}: UpdateProps): Promise<any> {
  try {
    const url = `/users/${userId}/expenses/${expenseId}`;
    const body = { title, imageUrl, isPaid, isActive };
    const { data: response } = await api.patch(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}

export const expenseService = {
  fetchAll,
  create,
  update,
};
