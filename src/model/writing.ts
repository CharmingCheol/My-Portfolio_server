import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { Writing } from 'types/writing';

@Entity()
class WritingModel implements Writing {
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: randomUUID() })
  id: string;

  @Column()
  @ApiProperty({ example: 'content' })
  content: string;

  @Column()
  @ApiProperty({ example: 'title' })
  title: string;
}

export default WritingModel;
