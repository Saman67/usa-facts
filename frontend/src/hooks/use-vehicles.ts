import type { Vehicle } from '../api-client';
import { useQuery } from '@tanstack/react-query';
import { VehiclesClient } from '../config/client';

interface UseVehiclesListOptions {
  searchTerm?: string;
}

export function useVehiclesList(options: UseVehiclesListOptions = {}) {
  const { searchTerm } = options;
  
  const query = useQuery<Vehicle[]>({
    queryKey: ['vehicles', searchTerm],
    queryFn: async () => {
      const response = await VehiclesClient.vehiclesControllerFindAll();
      const vehicles = response.data;

      if (searchTerm) {
        return vehicles.filter(vehicle =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return vehicles;
    },
  });

  return {
    vehicles: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function useVehicleById(id: number) {
  const query = useQuery<Vehicle>({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const response = await VehiclesClient.vehiclesControllerFindOne(id);
      return response.data;
    },
    enabled: !!id,
  });

  return {
    vehicle: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
} 