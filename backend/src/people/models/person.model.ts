import { ApiProperty } from '@nestjs/swagger';

export class Person {
  @ApiProperty({ example: 'Luke Skywalker', description: 'The name of this person' })
  name: string;

  @ApiProperty({ example: '172', description: 'The height of this person in centimeters' })
  height: string;

  @ApiProperty({ example: '77', description: 'The mass of this person in kilograms' })
  mass: string;

  @ApiProperty({ example: 'blond', description: 'The hair color of this person' })
  hair_color: string;

  @ApiProperty({ example: 'fair', description: 'The skin color of this person' })
  skin_color: string;

  @ApiProperty({ example: 'blue', description: 'The eye color of this person' })
  eye_color: string;

  @ApiProperty({ example: '19BBY', description: 'The birth year of this person' })
  birth_year: string;

  @ApiProperty({ example: 'male', description: 'The gender of this person' })
  gender: string;

  @ApiProperty({ example: 'https://swapi.dev/api/planets/1/', description: 'The URL of the homeworld of this person' })
  homeworld: string;

  @ApiProperty({ example: ['https://swapi.dev/api/films/1/'], description: 'URLs of films this person has been in' })
  films: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'], description: 'URLs of species this person belongs to' })
  species: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/14/'], description: 'URLs of vehicles this person has piloted' })
  vehicles: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/starships/12/'], description: 'URLs of starships this person has piloted' })
  starships: string[];

  @ApiProperty({ example: '2014-12-09T13:50:51.644000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/people/1/', description: 'The URL of this resource' })
  url: string;
} 