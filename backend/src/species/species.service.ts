import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Species } from './models/species.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class SpeciesService {
  private readonly baseUrl = 'https://swapi.dev/api/species';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Species[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Species>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Species> {
    const { data } = await firstValueFrom(
      this.httpService.get<Species>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 