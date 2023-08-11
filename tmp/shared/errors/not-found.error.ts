export class NotFoundError extends Error {
  status: number;

  constructor(param: string) {
    super(`${param} not found`);
    this.status = 404;
  }
}
