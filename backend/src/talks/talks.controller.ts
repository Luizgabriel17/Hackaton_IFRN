import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TalksService } from './talks.service';

@Controller('talks')
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Get()
  findAll() {
    return this.talksService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.talksService.create(body);
  }
  @Delete(':id')
remove(@Param('id') id: string) {
  return this.talksService.remove(Number(id));
}
}