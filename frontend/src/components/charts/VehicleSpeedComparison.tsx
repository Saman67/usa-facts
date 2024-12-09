import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { Box, Typography } from '@mui/material';
import { useVehiclesList } from '../../hooks/use-vehicles';
import { formatNumericValue } from '../../utils/format';

interface VehicleData {
  id: string;
  data: Array<{
    x: number;
    y: number;
    name: string;
    crew: string;
  }>;
}

export const VehicleSpeedComparison = () => {
  const { vehicles } = useVehiclesList();

  const chartData: VehicleData[] = [{
    id: 'vehicles',
    data: vehicles
      ?.filter(v => 
        v.max_atmosphering_speed !== 'unknown' && 
        v.cost_in_credits !== 'unknown'
      )
      .map(vehicle => ({
        x: parseInt(vehicle.max_atmosphering_speed) || 0,
        y: parseInt(vehicle.cost_in_credits) || 0,
        name: vehicle.name,
        crew: vehicle.crew,
      })) || []
  }];

  return (
    <Box sx={{ width: '100%', height: '100%', py: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Vehicle Speed vs Cost Comparison
      </Typography>
      <Box sx={{ width: '100%', height: '100%', pt: 6, mt: -6 }}>
        <ResponsiveScatterPlot
          data={chartData}
          margin={{ top: 10, right: 40, bottom: 50, left: 90 }}
          xScale={{ type: 'linear', min: 0, max: 'auto' }}
          xFormat={(value) => `${value} km/h`}
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          yFormat={(value) => formatNumericValue(value.toString(), { style: 'currency', currency: 'USD' })}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Speed (km/h)',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Cost (credits)',
            legendPosition: 'middle',
            legendOffset: -60,
            format: (value) => {
              if (value >= 1000) {
                return `$${Math.round(value / 1000)}k`;
              }
              return value;
            }
          }}
          tooltip={({ node }) => (
            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">{node.data.name}</Typography>
              <Typography variant="body2">
                Speed: {node.data.x} km/h
              </Typography>
              <Typography variant="body2">
                Cost: {formatNumericValue(node.data.y.toString(), { style: 'currency', currency: 'USD' })}
              </Typography>
              <Typography variant="body2">
                Crew: {node.data.crew}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}; 