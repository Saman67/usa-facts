import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { Box, Typography } from '@mui/material';
import { usePlanetsList } from '../../hooks/use-planets';
import { formatNumericValue } from '../../utils/format';
import { Planet } from '../../api-client';

interface PlanetNode {
  name: string;
  value: number;
  population?: string;
  climate?: string;
  terrain?: string;
}

interface PlanetData extends PlanetNode {
  children: PlanetNode[];
}

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export const PlanetVisualization = () => {
  const { planets } = usePlanetsList();

  const chartData: PlanetData = {
    name: 'planets',
    value: 0,
    children: planets?.map((planet: Planet) => ({
      name: planet.name,
      value: parseInt(planet.diameter) || 0,
      population: formatNumericValue(planet.population),
      climate: planet.climate,
      terrain: planet.terrain,
    })) || []
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Planet Sizes and Population
      </Typography>
      <Box sx={{ width: '100%', height: '100%', pt: 6, mt: -6 }}>
        <ResponsiveCirclePacking<PlanetNode>
          data={chartData}
          margin={defaultMargin}
          id="name"
          value="value"
          colors={{ scheme: 'paired' }}
          childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
          padding={4}
          labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          borderWidth={1}
          borderColor={{ from: 'color' }}
          tooltip={({ data }) => (
            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">{data.name}</Typography>
              <Typography variant="body2">
                Diameter: {formatNumericValue(data.value.toString(), {suffix: 'km'})}
              </Typography>
              {data.population && (
                <Typography variant="body2">Population: {data.population}</Typography>
              )}
              {data.climate && (
                <Typography variant="body2">Climate: {data.climate}</Typography>
              )}
              {data.terrain && (
                <Typography variant="body2">Terrain: {data.terrain}</Typography>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}; 