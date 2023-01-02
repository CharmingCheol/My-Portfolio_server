import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImageUploadResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '업로드 된 이미지의 주소입니다.', required: true })
  path: string;
}
