import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;

  const mockVehiclesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockVehicles = [
    {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
    },
  ];

  const mockSingleVehicle = {
    name: 'Sand Crawler',
    model: 'Digger Crawler',
    manufacturer: 'Corellia Mining Corporation',
    cost_in_credits: '150000',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: mockVehiclesService,
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      mockVehiclesService.findAll.mockResolvedValue(mockVehicles);
      const result = await controller.findAll();
      expect(result).toEqual(mockVehicles);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      mockVehiclesService.findOne.mockResolvedValue(mockSingleVehicle);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSingleVehicle);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 