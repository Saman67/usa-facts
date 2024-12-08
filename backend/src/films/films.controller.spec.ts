import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockFilms = [
    {
      title: 'A New Hope',
      episode_id: 4,
      director: 'George Lucas',
    },
  ];

  const mockSingleFilm = {
    title: 'A New Hope',
    episode_id: 4,
    director: 'George Lucas',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      mockFilmsService.findAll.mockResolvedValue(mockFilms);
      const result = await controller.findAll();
      expect(result).toEqual(mockFilms);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single film', async () => {
      mockFilmsService.findOne.mockResolvedValue(mockSingleFilm);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSingleFilm);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
}); 