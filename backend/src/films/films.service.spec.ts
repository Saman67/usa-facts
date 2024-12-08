import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { FilmsService } from './films.service';
import { of } from 'rxjs';

describe('FilmsService', () => {
  let service: FilmsService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockFilmResponse = {
    data: {
      results: [
        {
          title: 'A New Hope',
          episode_id: 4,
          director: 'George Lucas',
        },
      ],
    },
  };

  const mockSingleFilmResponse = {
    data: {
      title: 'A New Hope',
      episode_id: 4,
      director: 'George Lucas',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      mockHttpService.get.mockReturnValue(of(mockFilmResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockFilmResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/films');
    });
  });

  describe('findOne', () => {
    it('should return a single film', async () => {
      mockHttpService.get.mockReturnValue(of(mockSingleFilmResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSingleFilmResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/films/1');
    });
  });
}); 