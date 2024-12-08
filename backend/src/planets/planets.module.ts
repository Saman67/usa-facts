import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

@Module({
  imports: [HttpModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {} 