import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './models/planet.model';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async findAll(): Promise<Planet[]> {
    return this.planetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return this.planetsService.findOne(id);
  }
} 