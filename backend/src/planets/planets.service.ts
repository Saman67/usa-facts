import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Planet } from './models/planet.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class PlanetsService {
  private readonly baseUrl = 'https://swapi.dev/api/planets';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Planet[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Planet>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Planet> {
    const { data } = await firstValueFrom(
      this.httpService.get<Planet>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 