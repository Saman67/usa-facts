import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

describe('SpeciesController', () => {
  let controller: SpeciesController;
  let service: SpeciesService;

  const mockSpeciesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockSpecies = [
    {
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      average_height: '180',
    },
  ];

  const mockSingleSpecies = {
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '180',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [
        {
          provide: SpeciesService,
          useValue: mockSpeciesService,
        },
      ],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      mockSpeciesService.findAll.mockResolvedValue(mockSpecies);
      const result = await controller.findAll();
      expect(result).toEqual(mockSpecies);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single species', async () => {
      mockSpeciesService.findOne.mockResolvedValue(mockSingleSpecies);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSingleSpecies);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 