export class UserNotFoundError extends Error {
  status: number;

  constructor() {
    super(`User not found`);
    this.status = 404;
  }
}
