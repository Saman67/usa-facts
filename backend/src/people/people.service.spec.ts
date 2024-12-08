import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { PeopleService } from './people.service';
import { of } from 'rxjs';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockPeopleResponse = {
    data: {
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
        },
      ],
    },
  };

  const mockSinglePersonResponse = {
    data: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      mockHttpService.get.mockReturnValue(of(mockPeopleResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockPeopleResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/people');
    });
  });

  describe('findOne', () => {
    it('should return a single person', async () => {
      mockHttpService.get.mockReturnValue(of(mockSinglePersonResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSinglePersonResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    });
  });
}); 