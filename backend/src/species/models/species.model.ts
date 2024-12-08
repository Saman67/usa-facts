import { ApiProperty } from '@nestjs/swagger';

export class Species {
  @ApiProperty({ example: 'Human', description: 'The name of this species' })
  name: string;

  @ApiProperty({ example: 'mammal', description: 'The classification of this species' })
  classification: string;

  @ApiProperty({ example: 'sentient', description: 'The designation of this species' })
  designation: string;

  @ApiProperty({ example: '180', description: 'The average height of this species in centimeters' })
  average_height: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic', description: 'The skin colors that occur naturally for this species' })
  skin_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red', description: 'The hair colors that occur naturally for this species' })
  hair_colors: string;

  @ApiProperty({ example: 'brown, blue, green', description: 'The eye colors that occur naturally for this species' })
  eye_colors: string;

  @ApiProperty({ example: '120', description: 'The average lifespan of this species in years' })
  average_lifespan: string;

  @ApiProperty({ example: 'https://swapi.dev/api/planets/1/', description: 'The URL of the planet that this species originates from' })
  homeworld: string;

  @ApiProperty({ example: 'Galactic Basic', description: 'The language commonly spoken by this species' })
  language: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'], description: 'URLs of people that are a part of this species' })
  people: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/films/1/'], description: 'URLs of films that this species has appeared in' })
  films: string[];

  @ApiProperty({ example: '2014-12-10T13:52:11.567000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:36:42.136000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/species/1/', description: 'The URL of this resource' })
  url: string;
} 