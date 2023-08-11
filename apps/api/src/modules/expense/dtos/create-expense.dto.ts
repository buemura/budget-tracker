import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
