import { ResponsivePie } from '@nivo/pie';
import { Box, Typography } from '@mui/material';
import { useFilmsList } from '../../hooks/use-films';
import { usePeopleList } from '../../hooks/use-people';
import { usePlanetsList } from '../../hooks/use-planets';
import { useSpeciesList } from '../../hooks/use-species';
import { useStarshipsList } from '../../hooks/use-starships';
import { useVehiclesList } from '../../hooks/use-vehicles';

export const EntityDistribution = () => {
  const { films } = useFilmsList();
  const { people } = usePeopleList();
  const { planets } = usePlanetsList();
  const { species } = useSpeciesList();
  const { starships } = useStarshipsList();
  const { vehicles } = useVehiclesList();

  const chartData = [
    { id: 'Films', value: films?.length || 0, color: '#FF6B6B' },
    { id: 'People', value: people?.length || 0, color: '#4ECDC4' },
    { id: 'Planets', value: planets?.length || 0, color: '#45B7D1' },
    { id: 'Species', value: species?.length || 0, color: '#96CEB4' },
    { id: 'Starships', value: starships?.length || 0, color: '#FFEEAD' },
    { id: 'Vehicles', value: vehicles?.length || 0, color: '#D4A5A5' }
  ];

  return (
    <Box sx={{ height: 400 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Star Wars Universe Entity Distribution
      </Typography>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle'
          }
        ]}
      />
    </Box>
  );
}; 