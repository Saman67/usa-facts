import type { Film } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { FilmsClient } from '../config/client';

interface UseFilmsListOptions {
  searchTerm?: string;
}

export function useFilmsList(options: UseFilmsListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Film[]>({
    queryKey: ['films'],
    queryFn: async () => {
      const response = await FilmsClient.filmsControllerFindAll();
      return response.data;
    },
    select: (data) => {
      if (!searchTerm) return data;
      return data.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  });

  return {
    films: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function useFilmById(id: number) {
  const query = useQuery<Film>({
    queryKey: ['film', id],
    queryFn: async () => {
      const response = await FilmsClient.filmsControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
  });

  return {
    film: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 