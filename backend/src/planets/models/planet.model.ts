import { ApiProperty } from '@nestjs/swagger';

export class Planet {
  @ApiProperty({ example: 'Tatooine', description: 'The name of this planet' })
  name: string;

  @ApiProperty({ example: '23', description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis' })
  rotation_period: string;

  @ApiProperty({ example: '304', description: 'The number of standard days it takes for this planet to complete a single orbit of its local star' })
  orbital_period: string;

  @ApiProperty({ example: '10465', description: 'The diameter of this planet in kilometers' })
  diameter: string;

  @ApiProperty({ example: 'arid', description: 'The climate of this planet' })
  climate: string;

  @ApiProperty({ example: '1 standard', description: 'A number denoting the gravity of this planet' })
  gravity: string;

  @ApiProperty({ example: 'desert', description: 'The terrain of this planet' })
  terrain: string;

  @ApiProperty({ example: '1', description: 'The percentage of the planet surface that is naturally occurring water' })
  surface_water: string;

  @ApiProperty({ example: '200000', description: 'The average population of sentient beings inhabiting this planet' })
  population: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'], description: 'URLs of people who have been residents on this planet' })
  residents: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/films/1/'], description: 'URLs of films that this planet has appeared in' })
  films: string[];

  @ApiProperty({ example: '2014-12-09T13:50:49.641000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T20:58:18.411000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/planets/1/', description: 'The URL of this resource' })
  url: string;
} 