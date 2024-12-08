import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { Starship } from './models/starship.model';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  async findAll(): Promise<Starship[]> {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Starship> {
    return this.starshipsService.findOne(id);
  }
} 