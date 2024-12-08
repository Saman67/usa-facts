import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { StarshipsService } from './starships.service';
import { of } from 'rxjs';

describe('StarshipsService', () => {
  let service: StarshipsService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockStarshipsResponse = {
    data: {
      results: [
        {
          name: 'Death Star',
          model: 'DS-1 Orbital Battle Station',
          manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
          cost_in_credits: '1000000000000',
        },
      ],
    },
  };

  const mockSingleStarshipResponse = {
    data: {
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: '1000000000000',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      mockHttpService.get.mockReturnValue(of(mockStarshipsResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockStarshipsResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/starships');
    });
  });

  describe('findOne', () => {
    it('should return a single starship', async () => {
      mockHttpService.get.mockReturnValue(of(mockSingleStarshipResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSingleStarshipResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/1');
    });
  });
}); 