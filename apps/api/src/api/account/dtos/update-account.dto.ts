import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  balance?: number;

  @IsNotEmpty()
  @IsString()
  icon?: string;
}
