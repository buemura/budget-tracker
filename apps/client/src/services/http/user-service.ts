import { User } from "../../interfaces/user";
import { api } from "./api";

type UpdateRequestProps = {
  accessToken: string;
  name?: string;
  profilePicture?: string;
};

async function updateUser({
  accessToken,
  name,
  profilePicture,
}: UpdateRequestProps): Promise<User> {
  const url = `/users`;
  const body: any = {
    ...(name && { name }),
    ...(profilePicture && { profilePicture }),
  };

  const { data: response } = await api.patch(url, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response?.data;
}

export const userService = {
  updateUser,
};
