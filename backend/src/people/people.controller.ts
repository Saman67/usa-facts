import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { Person } from './models/person.model';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all people', description: 'Retrieve a list of all Star Wars characters' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars characters',
    type: Person,
    isArray: true,
  })
  async findAll(): Promise<Person[]> {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person by ID', description: 'Retrieve a specific Star Wars character by their ID' })
  @ApiParam({ name: 'id', description: 'The ID of the person', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The character with the specified ID',
    type: Person,
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.peopleService.findOne(id);
  }
} 