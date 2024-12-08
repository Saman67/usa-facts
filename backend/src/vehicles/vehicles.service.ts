import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Vehicle } from './models/vehicle.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class VehiclesService {
  private readonly baseUrl = 'https://swapi.dev/api/vehicles';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Vehicle[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Vehicle>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Vehicle> {
    const { data } = await firstValueFrom(
      this.httpService.get<Vehicle>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 