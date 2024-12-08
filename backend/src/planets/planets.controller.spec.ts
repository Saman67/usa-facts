import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let service: PlanetsService;

  const mockPlanetsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPlanets = [
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
    },
  ];

  const mockSinglePlanet = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: mockPlanetsService,
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of planets', async () => {
      mockPlanetsService.findAll.mockResolvedValue(mockPlanets);
      const result = await controller.findAll();
      expect(result).toEqual(mockPlanets);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single planet', async () => {
      mockPlanetsService.findOne.mockResolvedValue(mockSinglePlanet);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSinglePlanet);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 