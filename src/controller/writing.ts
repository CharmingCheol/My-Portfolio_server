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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WritingRequestDto } from 'dto/writing';
import WritingModel from 'model/writing';
import WritingService from 'service/writing';
import BodyLengthValidationPipe from 'pipe/bodyLengthValidationPipe';
import PageUnderZeroPipe from 'pipe/pageUnderZeroPipe';

@Controller('writings')
@ApiTags('Writings API')
class WritingController {
  constructor(private writingService: WritingService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'id로 게시글 조회' })
  @ApiResponse({ status: HttpStatus.OK, type: WritingModel })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<WritingModel> {
    return await this.writingService.findWritingById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '게시글 페이지네이션' })
  @ApiResponse({ status: HttpStatus.OK, type: [WritingModel] })
  async pagination(@Query('page', ParseIntPipe, PageUnderZeroPipe) page: number): Promise<WritingModel[]> {
    return await this.writingService.findWritingsByPageNumber(page);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '게시글 생성' })
  @ApiResponse({ status: HttpStatus.CREATED, type: WritingModel })
  async create(@Body(new BodyLengthValidationPipe()) data: WritingRequestDto): Promise<WritingModel> {
    return await this.writingService.createWriting(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({ status: HttpStatus.OK, type: WritingModel })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new BodyLengthValidationPipe()) data: WritingRequestDto,
  ): Promise<WritingModel> {
    return await this.writingService.updateWriting(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '게시글 삭제' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.writingService.deleteWriting(id);
  }
}

export default WritingController;
