import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Writing } from 'types/writing';

@Entity()
class WritingModel implements Writing {
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  title: string;
}

export default WritingModel;
