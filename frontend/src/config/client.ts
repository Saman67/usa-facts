import {
  Configuration,
  PeopleApi,
  FilmsApi,
  PlanetsApi,
  SpeciesApi,
  StarshipsApi,
  VehiclesApi,
} from '../api-client';

const config = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3010',
});

export const PeopleClient = new PeopleApi(config);
export const FilmsClient = new FilmsApi(config);
export const PlanetsClient = new PlanetsApi(config);
export const SpeciesClient = new SpeciesApi(config);
export const StarshipsClient = new StarshipsApi(config);
export const VehiclesClient = new VehiclesApi(config);
