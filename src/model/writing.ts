import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

import { Writing } from 'types/writing';

@Entity({ name: 'Writing' })
class WritingModel implements Writing {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  title: string;
}

export default WritingModel;
