import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Starship } from './models/starship.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class StarshipsService {
  private readonly baseUrl = 'https://swapi.dev/api/starships';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Starship[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Starship>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Starship> {
    const { data } = await firstValueFrom(
      this.httpService.get<Starship>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 