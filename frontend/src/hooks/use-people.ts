import type { Person } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { PeopleClient } from '../config/client';

interface UsePeopleListOptions {
  searchTerm?: string;
}

export function usePeopleList(options: UsePeopleListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Person[]>({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await PeopleClient.peopleControllerFindAll();
      return response.data;
    },
    select: (data) => {
      if (!searchTerm) return data;
      return data.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    people: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function usePeopleById(id: number) {
  const query = useQuery<Person>({
    queryKey: ['person', id],
    queryFn: async () => {
      const response = await PeopleClient.peopleControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    person: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}
