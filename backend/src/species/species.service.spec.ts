import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { SpeciesService } from './species.service';
import { of } from 'rxjs';

describe('SpeciesService', () => {
  let service: SpeciesService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockSpeciesResponse = {
    data: {
      results: [
        {
          name: 'Human',
          classification: 'mammal',
          designation: 'sentient',
          average_height: '180',
        },
      ],
    },
  };

  const mockSingleSpeciesResponse = {
    data: {
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      average_height: '180',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      mockHttpService.get.mockReturnValue(of(mockSpeciesResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockSpeciesResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/species');
    });
  });

  describe('findOne', () => {
    it('should return a single species', async () => {
      mockHttpService.get.mockReturnValue(of(mockSingleSpeciesResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSingleSpeciesResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/species/1');
    });
  });
}); 