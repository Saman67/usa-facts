import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './models/person.model';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  findAll(): Promise<Person[]> {
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.peopleService.findOne(id);
  }
} 