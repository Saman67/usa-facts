import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { VehiclesService } from './vehicles.service';
import { of } from 'rxjs';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockVehiclesResponse = {
    data: {
      results: [
        {
          name: 'Sand Crawler',
          model: 'Digger Crawler',
          manufacturer: 'Corellia Mining Corporation',
          cost_in_credits: '150000',
        },
      ],
    },
  };

  const mockSingleVehicleResponse = {
    data: {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      mockHttpService.get.mockReturnValue(of(mockVehiclesResponse));
      const result = await service.findAll();
      expect(result).toEqual(mockVehiclesResponse.data.results);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/vehicles');
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      mockHttpService.get.mockReturnValue(of(mockSingleVehicleResponse));
      const result = await service.findOne(1);
      expect(result).toEqual(mockSingleVehicleResponse.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/vehicles/1');
    });
  });
}); 