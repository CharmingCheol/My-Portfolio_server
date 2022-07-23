import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Writing } from 'types/writing';

export class WritingRequestDto implements Pick<Writing, 'content' | 'title'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '게시글의 본문입니다.', required: true })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '게시글의 제목입니다.', required: true })
  title: string;
}
