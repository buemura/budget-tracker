export class MissingParametersError extends Error {
  status: number;

  constructor(...params: string[]) {
    super(`Missing required parameter: ${params}`);
    this.status = 400;
  }
}
