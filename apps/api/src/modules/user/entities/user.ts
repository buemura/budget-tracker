import { randomUUID } from 'crypto';

interface Input {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(input: Input) {
    const { id, name, email, password } = input;
    this.id = id ?? randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
