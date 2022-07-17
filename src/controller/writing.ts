import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { WritingRequestDto } from 'dto/writing';
import WritingModel from 'model/writing';
import WritingService from 'service/writing';
import BodyLengthValidationPipe from 'pipe/bodyLengthValidationPipe';
import PageUnderZeroPipe from 'pipe/pageUnderZeroPipe';

@Controller('writings')
class WritingController {
  constructor(private writingService: WritingService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<WritingModel> {
    return await this.writingService.findWritingById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async pagination(@Query('page', ParseIntPipe, PageUnderZeroPipe) page: number): Promise<WritingModel[]> {
    return await this.writingService.findWritingsByPageNumber(page);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new BodyLengthValidationPipe()) data: WritingRequestDto): Promise<WritingModel> {
    return await this.writingService.createWriting(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new BodyLengthValidationPipe()) data: WritingRequestDto,
  ): Promise<WritingModel> {
    return await this.writingService.updateWriting(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.writingService.deleteWriting(id);
  }
}

export default WritingController;
