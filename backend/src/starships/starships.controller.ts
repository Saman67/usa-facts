import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { Starship } from './models/starship.model';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all starships', description: 'Retrieve a list of all Star Wars starships' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars starships',
    type: Starship,
    isArray: true,
  })
  async findAll(): Promise<Starship[]> {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a starship by ID', description: 'Retrieve a specific Star Wars starship by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the starship', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The starship with the specified ID',
    type: Starship,
  })
  @ApiResponse({
    status: 404,
    description: 'Starship not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Starship> {
    return this.starshipsService.findOne(id);
  }
} 