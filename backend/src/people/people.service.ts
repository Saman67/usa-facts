import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Person } from './models/person.model';
import { SwapiResponse } from '../common/interfaces/swapi-response.interface';

@Injectable()
export class PeopleService {
  private readonly baseUrl = 'https://swapi.dev/api/people';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Person[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<Person>>(this.baseUrl)
    );
    return data.results;
  }

  async findOne(id: number): Promise<Person> {
    const { data } = await firstValueFrom(
      this.httpService.get<Person>(`${this.baseUrl}/${id}`)
    );
    return data;
  }
} 