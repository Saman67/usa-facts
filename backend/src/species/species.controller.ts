import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { Species } from './models/species.model';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all species', description: 'Retrieve a list of all Star Wars species' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars species',
    type: Species,
    isArray: true,
  })
  async findAll(): Promise<Species[]> {
    return this.speciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a species by ID', description: 'Retrieve a specific Star Wars species by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the species', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The species with the specified ID',
    type: Species,
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Species> {
    return this.speciesService.findOne(id);
  }
} 