import type { Starship } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { StarshipsClient } from '../config/client';

interface UseStarshipsListOptions {
  searchTerm?: string;
}

export function useStarshipsList(options: UseStarshipsListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Starship[]>({
    queryKey: ['starships', searchTerm],
    queryFn: async () => {
      const response = await StarshipsClient.starshipsControllerFindAll();
      const starships = response.data;

      if (searchTerm) {
        return starships.filter(starship =>
          starship.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return starships;
    },
  });

  return {
    starships: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function useStarshipById(id: number) {
  const query = useQuery<Starship>({
    queryKey: ['starship', id],
    queryFn: async () => {
      const response = await StarshipsClient.starshipsControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
  });

  return {
    starship: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 