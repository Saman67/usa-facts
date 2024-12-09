import type { Planet } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { PlanetsClient } from '../config/client';

interface UsePlanetsListOptions {
  searchTerm?: string;
}

export function usePlanetsList(options: UsePlanetsListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Planet[]>({
    queryKey: ['planets'],
    queryFn: async () => {
      const response = await PlanetsClient.planetsControllerFindAll();
      return response.data;
    },
    select: (data) => {
      if (!searchTerm) return data;
      return data.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
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
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    planet: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 