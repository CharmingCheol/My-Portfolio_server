import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { WritingRequestDto } from 'dto/writing';
import WritingModel from 'model/writing';
import { WritingPagination } from 'types/writing';

@Injectable()
class WritingService {
  constructor(
    @InjectRepository(WritingModel)
    private usersRepository: Repository<WritingModel>,
  ) {}

  async findWritingsByPageNumber(pageNumber: number): Promise<WritingPagination> {
    try {
      const size = 10;
      const totalCount = await this.usersRepository.count();
      const list = await this.usersRepository.find({
        take: size,
        skip: (pageNumber - 1) * size,
        order: { createdAt: 'DESC' },
      });
      if (totalCount === 0 || list.length === 0) {
        throw new EntityNotFoundError(WritingModel, pageNumber);
      }
      return { list, totalCount };
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

  async updateWriting(id: string, updateData: Partial<WritingRequestDto>): Promise<WritingModel> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      if (this.isSubset(writing, updateData)) {
        throw new BadRequestException();
      }
      const result = await this.usersRepository.save({ ...writing, ...updateData });
      return result;
    } catch (error) {
      throw error;
    }
  }

  private isSubset<O extends { [key: string]: any }>(superset: O, subset: O) {
    let count = 0;
    const subsetKeys = Object.keys(subset);
    subsetKeys.forEach((key) => {
      if (superset[key] === subset[key]) {
        count += 1;
      }
    });
    return count === subsetKeys.length;
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
