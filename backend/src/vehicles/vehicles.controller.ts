import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './models/vehicle.model';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vehicles', description: 'Retrieve a list of all Star Wars vehicles' })
  @ApiResponse({
    status: 200,
    description: 'List of all Star Wars vehicles',
    type: Vehicle,
    isArray: true,
  })
  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by ID', description: 'Retrieve a specific Star Wars vehicle by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the vehicle', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'The vehicle with the specified ID',
    type: Vehicle,
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
} 