import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './models/film.model';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    return this.filmsService.findOne(id);
  }
} 