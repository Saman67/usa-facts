import type { Species } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { SpeciesClient } from '../config/client';

interface UseSpeciesListOptions {
  searchTerm?: string;
}

export function useSpeciesList(options: UseSpeciesListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Species[]>({
    queryKey: ['species', searchTerm],
    queryFn: async () => {
      const response = await SpeciesClient.speciesControllerFindAll();
      const species = response.data;

      if (searchTerm) {
        return species.filter(s =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return species;
    },
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
  });

  return {
    species: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 