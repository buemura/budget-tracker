// import { randomUUID } from 'crypto';

// interface Input {
//   id?: string;
//   name: string;
//   email: string;
//   password: string;
//   profilePicture?: string;
// }

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;

  // constructor(input: Input) {
  //   const { id, name, email, password, profilePicture } = input;
  //   this.id = id ?? randomUUID();
  //   this.name = name;
  //   this.email = email;
  //   this.password = password;
  //   this.profilePicture = profilePicture ?? null;
  // }
}
