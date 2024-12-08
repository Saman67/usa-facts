import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { Planet } from './models/planet.model';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all planets', description: 'Retrieve a list of all Star Wars planets' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars planets',
    type: Planet,
    isArray: true,
  })
  async findAll(): Promise<Planet[]> {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a planet by ID', description: 'Retrieve a specific Star Wars planet by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the planet', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The planet with the specified ID',
    type: Planet,
  })
  @ApiResponse({
    status: 404,
    description: 'Planet not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return this.planetsService.findOne(id);
  }
} 