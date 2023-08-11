import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExpenseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
