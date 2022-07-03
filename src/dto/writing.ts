import { Writing } from 'types/writing';
import { IsNotEmpty, IsString } from 'class-validator';

export class WritingRequestDto implements Pick<Writing, 'content' | 'title'> {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class WritingResponseDto implements Writing {
  createdAt: Date;

  id: string;

  content: string;

  title: string;
}
