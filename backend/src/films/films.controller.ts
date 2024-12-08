import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { Film } from './models/film.model';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all films', description: 'Retrieve a list of all Star Wars films' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars films',
    type: Film,
    isArray: true,
  })
  async findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a film by ID', description: 'Retrieve a specific Star Wars film by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the film', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The film with the specified ID',
    type: Film,
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    return this.filmsService.findOne(id);
  }
} 