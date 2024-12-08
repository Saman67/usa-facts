import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Film } from './models/film.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class FilmsService {
  private readonly baseUrl = 'https://swapi.dev/api/films';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Film[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Film>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Film> {
    const { data } = await firstValueFrom(
      this.httpService.get<Film>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 