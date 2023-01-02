import { BadRequestException, Injectable, ConsoleLogger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { WritingRequestDto } from 'dto/writing';
import WritingModel from 'model/writing';
import { WritingPagination } from 'types/writing';

@Injectable()
class WritingService {
  constructor(
    private logger: ConsoleLogger,
    @InjectRepository(WritingModel)
    private usersRepository: Repository<WritingModel>,
  ) {}

  async findWritingsByPageNumber(pageNumber: number): Promise<WritingPagination> {
    try {
      const size = 10;
      const [list, totalCount] = await this.usersRepository.findAndCount({
        take: size,
        skip: (pageNumber - 1) * size,
        order: { createdAt: 'DESC' },
      });
      if (totalCount === 0 || list.length === 0) {
        throw new EntityNotFoundError(WritingModel, pageNumber);
      }
      this.logger.log(JSON.stringify({ list, totalCount }));
      return { list, totalCount };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findWritingById(id: string): Promise<WritingModel> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      this.logger.log(JSON.stringify(writing));
      return writing;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createWriting(data: WritingRequestDto): Promise<WritingModel> {
    try {
      const writing = await this.usersRepository.save(data);
      this.logger.log(JSON.stringify(writing));
      return writing;
    } catch (error) {
      this.logger.error(error);
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
      const updatedWriting = await this.usersRepository.save({ ...writing, ...updateData });
      this.logger.log(JSON.stringify(updatedWriting));
      return updatedWriting;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private isSubset(writing: WritingModel, updateData: Partial<WritingRequestDto>) {
    let count = 0;
    const updateDataKeys = Object.keys(updateData);
    updateDataKeys.forEach((key) => {
      if (writing[key] === updateData[key]) {
        count += 1;
      }
    });
    return count === updateDataKeys.length;
  }

  async deleteWriting(id: string): Promise<void> {
    try {
      const writing = await this.usersRepository.findOne({ id });
      if (!writing) {
        throw new EntityNotFoundError(WritingModel, id);
      }
      this.logger.log('delete writing');
      await this.usersRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

export default WritingService;
