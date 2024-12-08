import { ApiProperty } from '@nestjs/swagger';

export class Vehicle {
  @ApiProperty({ example: 'Sand Crawler', description: 'The name of this vehicle' })
  name: string;

  @ApiProperty({ example: 'Digger Crawler', description: 'The model or official name of this vehicle' })
  model: string;

  @ApiProperty({ example: 'wheeled', description: 'The class of this vehicle' })
  vehicle_class: string;

  @ApiProperty({ example: 'Corellia Mining Corporation', description: 'The manufacturer of this vehicle' })
  manufacturer: string;

  @ApiProperty({ example: '150000', description: 'The cost of this vehicle new, in galactic credits' })
  cost_in_credits: string;

  @ApiProperty({ example: '36.8', description: 'The length of this vehicle in meters' })
  length: string;

  @ApiProperty({ example: '46', description: 'The number of personnel needed to run or pilot this vehicle' })
  crew: string;

  @ApiProperty({ example: '30', description: 'The number of non-essential people this vehicle can transport' })
  passengers: string;

  @ApiProperty({ example: '30', description: 'The maximum speed of this vehicle in atmosphere' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '50000', description: 'The maximum number of kilograms that this vehicle can transport' })
  cargo_capacity: string;

  @ApiProperty({ example: '2 months', description: 'The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply' })
  consumables: string;

  @ApiProperty({ example: ['https://swapi.dev/api/films/1/'], description: 'URLs of films that this vehicle has appeared in' })
  films: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'], description: 'URLs of people who have piloted this vehicle' })
  pilots: string[];

  @ApiProperty({ example: '2014-12-10T15:36:25.724000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:30:21.661000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/vehicles/4/', description: 'The URL of this resource' })
  url: string;
} 