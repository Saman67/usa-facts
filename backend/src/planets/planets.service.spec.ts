import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { PlanetsService } from './planets.service';
import { of } from 'rxjs';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockPlanetsResponse = {
    data: {
      results: [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
        },
      ],
    },
  };

  const mockSinglePlanetResponse = {
    data: {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      mockHttpService.get.mockReturnValue(of(mockPlanetsResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockPlanetsResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    });
  });

  describe('findOne', () => {
    it('should return a single planet', async () => {
      mockHttpService.get.mockReturnValue(of(mockSinglePlanetResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSinglePlanetResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
    });
  });
}); 