import type { Planet } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { PlanetsClient } from '../config/client';

interface UsePlanetsListOptions {
  searchTerm?: string;
}

export function usePlanetsList(options: UsePlanetsListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Planet[]>({
    queryKey: ['planets', searchTerm],
    queryFn: async () => {
      const response = await PlanetsClient.planetsControllerFindAll();
      const planets = response.data;

      if (searchTerm) {
        return planets.filter(planet =>
          planet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return planets;
    },
  });

  return {
    planets: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function usePlanetById(id: number) {
  const query = useQuery<Planet>({
    queryKey: ['planet', id],
    queryFn: async () => {
      const response = await PlanetsClient.planetsControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
  });

  return {
    planet: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 