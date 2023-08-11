export interface AccessTokenProvider {
  generate(payload: string | object | Buffer): string;
  verify(): void;
}
