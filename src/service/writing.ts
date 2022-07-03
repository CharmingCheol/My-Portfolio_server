import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { WritingRequestDto } from 'dto/writing';
import WritingModel from 'model/writing';

@Injectable()
class WritingService {
  constructor(
    @InjectRepository(WritingModel)
    private usersRepository: Repository<WritingModel>,
  ) {}

  async findWritingsByPageNumber(pageNumber: number): Promise<[WritingModel[], number]> {
    try {
      const size = 10;
      const result = await this.usersRepository.findAndCount({
        take: size,
        skip: (pageNumber - 1) * size,
        order: { createdAt: 'DESC' },
      });
      if (result[1] === 0) {
        throw new EntityNotFoundError(WritingModel, pageNumber);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findWritingById(id: string): Promise<WritingModel> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      return writing;
    } catch (error) {
      throw error;
    }
  }

  async createWriting(data: WritingRequestDto): Promise<WritingModel> {
    try {
      const result = await this.usersRepository.save(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateWriting(id: string, updateData: WritingRequestDto): Promise<WritingModel> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      const result = await this.usersRepository.save({ ...writing, ...updateData });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteWriting(id: string): Promise<void> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      await this.usersRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default WritingService;
