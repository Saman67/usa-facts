import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './models/vehicle.model';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
} 