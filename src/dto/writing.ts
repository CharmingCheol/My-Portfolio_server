import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Writing } from 'types/writing';

export class WritingRequestDto implements Pick<Writing, 'content' | 'title'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
