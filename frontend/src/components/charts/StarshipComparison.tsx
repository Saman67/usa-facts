import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography } from '@mui/material';
import { useStarshipsList } from '../../hooks/use-starships';
import { formatNumericValue } from '../../utils/format';
import { Starship } from '../../api-client';

interface StarshipData {
  [key: string]: string | number;
  name: string;
  passengers: number;
  cost: number;
  cargo: number;
}

export const StarshipComparison = () => {
  const { starships } = useStarshipsList();

  const processStarshipData = (ship: Starship): StarshipData => ({
    name: ship.name,
    passengers: parseInt(ship.passengers.replace(/,/g, '')) || 0,
    cost: parseInt(ship.cost_in_credits) || 0,
    cargo: parseInt(ship.cargo_capacity) || 0,
  });

  const chartData: StarshipData[] = starships
    ?.filter(ship => 
      ship.cost_in_credits !== 'unknown' && 
      ship.passengers !== 'unknown' && 
      ship.cargo_capacity !== 'unknown'
    )
    .slice(0, 5)
    .map(processStarshipData)
    .sort((a, b) => b.cost - a.cost) || [];

  return (
    <Box sx={{ width: '100%', height: '100%', p: 1 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Top 5 Starships Comparison
      </Typography>
      <Box sx={{ width: '100%', height: '100%', pt: 6, mt: -6 }}>
        <ResponsiveBar
          data={chartData}
          keys={['passengers', 'cost', 'cargo']}
          indexBy="name"
          margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
          padding={0.2}
          groupMode="grouped"
          innerPadding={3}
          valueScale={{ type: 'symlog' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Starship',
            legendPosition: 'middle',
            legendOffset: 70
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value (log scale)',
            legendPosition: 'middle',
            legendOffset: -40,
            tickValues: [],
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          tooltip={({ id, value, indexValue }) => (
            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">{indexValue}</Typography>
              <Typography variant="body2">
                {id === 'passengers' && `Passengers: ${formatNumericValue(value.toString())}`}
                {id === 'cost' && `Cost: ${formatNumericValue(value.toString(), { style: 'currency', currency: 'USD', suffix: 'credits' })}`}
                {id === 'cargo' && `Cargo Capacity: ${formatNumericValue(value.toString(), { suffix: 'kg' })}`}
              </Typography>
            </Box>
          )}
          enableGridY={false}
          enableLabel={false}
        />
      </Box>
    </Box>
  );
}; 