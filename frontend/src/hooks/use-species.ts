import type { Species } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { SpeciesClient } from '../config/client';

interface UseSpeciesListOptions {
  searchTerm?: string;
}

export function useSpeciesList(options: UseSpeciesListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Species[]>({
    queryKey: ['species'],
    queryFn: async () => {
      const response = await SpeciesClient.speciesControllerFindAll();
      return response.data;
    },
    select: (data) => {
      if (!searchTerm) return data;
      return data.filter(species =>
        species.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    species: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function useSpeciesById(id: number) {
  const query = useQuery<Species>({
    queryKey: ['species', id],
    queryFn: async () => {
      const response = await SpeciesClient.speciesControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    species: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 