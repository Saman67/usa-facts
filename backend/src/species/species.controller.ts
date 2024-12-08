import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { Species } from './models/species.model';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  async findAll(): Promise<Species[]> {
    return this.speciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Species> {
    return this.speciesService.findOne(id);
  }
} 