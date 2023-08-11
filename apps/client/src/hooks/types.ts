import { User } from "@interfaces/user";

export interface IUseFetchProps {
  user: User | null;
  page?: number;
  items?: number;
}
