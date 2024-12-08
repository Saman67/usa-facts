import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

  const mockPeopleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPeople = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
    },
  ];

  const mockSinglePerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of people', async () => {
      mockPeopleService.findAll.mockResolvedValue(mockPeople);
      const result = await controller.findAll();
      expect(result).toEqual(mockPeople);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single person', async () => {
      mockPeopleService.findOne.mockResolvedValue(mockSinglePerson);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSinglePerson);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 