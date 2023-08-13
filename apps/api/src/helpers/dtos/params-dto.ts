import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/)
  id: string;
}
