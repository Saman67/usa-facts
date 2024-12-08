import { ApiProperty } from '@nestjs/swagger';

export class Film {
  @ApiProperty({ example: 'A New Hope', description: 'The title of the film' })
  title: string;

  @ApiProperty({ example: 4, description: 'The episode number of the film' })
  episode_id: number;

  @ApiProperty({
    example: 'It is a period of civil war...',
    description: 'The opening crawl text of the film'
  })
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas', description: 'The director of the film' })
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum', description: 'The producer(s) of the film' })
  producer: string;

  @ApiProperty({ example: '1977-05-25', description: 'The release date of the film' })
  release_date: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'], description: 'URLs of characters that appear in the film' })
  characters: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/planets/1/'], description: 'URLs of planets that appear in the film' })
  planets: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/starships/2/'], description: 'URLs of starships that appear in the film' })
  starships: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/4/'], description: 'URLs of vehicles that appear in the film' })
  vehicles: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'], description: 'URLs of species that appear in the film' })
  species: string[];

  @ApiProperty({ example: '2014-12-10T14:23:31.880000Z', description: 'The ISO 8601 date format of when this resource was created' })
  created: string;

  @ApiProperty({ example: '2014-12-20T19:49:45.256000Z', description: 'The ISO 8601 date format of when this resource was edited' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/films/1/', description: 'The URL of this resource' })
  url: string;
} 