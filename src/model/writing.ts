import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Writing } from 'types/writing';

@Entity()
class WritingModel implements Writing {
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column()
  @ApiProperty({ example: '게시글의 본문입니다.', required: true })
  content: string;

  @Column()
  @ApiProperty({ example: '게시글의 제목입니다.', required: true })
  title: string;
}

export default WritingModel;
