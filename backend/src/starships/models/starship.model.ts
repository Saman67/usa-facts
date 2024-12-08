import { ApiProperty } from '@nestjs/swagger';

export class Starship {
  @ApiProperty({ example: 'Death Star', description: 'The name of this starship' })
  name: string;

  @ApiProperty({ example: 'DS-1 Orbital Battle Station', description: 'The model or official name of this starship' })
  model: string;

  @ApiProperty({ example: 'Deep Space Mobile Battlestation', description: 'The class of this starship' })
  starship_class: string;

  @ApiProperty({ example: 'Imperial Department of Military Research', description: 'The manufacturer of this starship' })
  manufacturer: string;

  @ApiProperty({ example: '1000000000000', description: 'The cost of this starship new, in galactic credits' })
  cost_in_credits: string;

  @ApiProperty({ example: '120000', description: 'The length of this starship in meters' })
  length: string;

  @ApiProperty({ example: '342,953', description: 'The number of personnel needed to run or pilot this starship' })
  crew: string;

  @ApiProperty({ example: '843,342', description: 'The number of non-essential people this starship can transport' })
  passengers: string;

  @ApiProperty({ example: '1000000000000', description: 'The maximum speed of this starship in atmosphere' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '4', description: 'The class of this starships hyperdrive' })
  hyperdrive_rating: string;

  @ApiProperty({ example: '3000000', description: 'The maximum number of kilograms that this starship can transport' })
  cargo_capacity: string;

  @ApiProperty({ example: '3 years', description: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply' })
  consumables: string;

  @ApiProperty({ example: '10', description: 'The Maximum number of Megalights this starship can travel in a standard hour' })
  MGLT: string;

  @ApiProperty({ example: ['https://swapi.dev/api/films/1/'], description: 'URLs of films that this starship has appeared in' })
  films: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'], description: 'URLs of people who have piloted this starship' })
  pilots: string[];

  @ApiProperty({ example: '2014-12-10T16:36:50.509000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:26:24.783000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/starships/9/', description: 'The URL of this resource' })
  url: string;
} 