import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  const mockStarshipsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockStarships = [
    {
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: '1000000000000',
    },
  ];

  const mockSingleStarship = {
    name: 'Death Star',
    model: 'DS-1 Orbital Battle Station',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        {
          provide: StarshipsService,
          useValue: mockStarshipsService,
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of starships', async () => {
      mockStarshipsService.findAll.mockResolvedValue(mockStarships);
      const result = await controller.findAll();
      expect(result).toEqual(mockStarships);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single starship', async () => {
      mockStarshipsService.findOne.mockResolvedValue(mockSingleStarship);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSingleStarship);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 