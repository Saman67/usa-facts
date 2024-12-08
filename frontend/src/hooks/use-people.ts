import type { Person } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { PeopleClient } from '../config/client';

interface UsePeopleListOptions {
  searchTerm?: string;
}

export function usePeopleList(options: UsePeopleListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Person[]>({
    queryKey: ['people', searchTerm],
    queryFn: async () => {
      const response = await PeopleClient.peopleControllerFindAll();
      const people = response.data;

      if (searchTerm) {
        return people.filter(person =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return people;
    },
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
    enabled: !!id, // Only run the query if we have an ID
  });

  return {
    person: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}
