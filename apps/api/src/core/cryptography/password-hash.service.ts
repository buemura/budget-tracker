export abstract class PasswordHashService {
  abstract compare(data: string | Buffer, encrypted: string): boolean;
  abstract hash(data: string | Buffer, saltOrRounds: string | number): string;
}
