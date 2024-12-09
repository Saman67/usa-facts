import { ResponsiveSunburst } from '@nivo/sunburst';
import { Box, Typography } from '@mui/material';
import { useSpeciesList } from '../../hooks/use-species';
import { Species } from '../../api-client';

interface SpeciesNode {
  name: string;
  value?: number;
  designation?: string;
  language?: string;
  children?: SpeciesNode[];
}

export const SpeciesHierarchy = () => {
  const { species } = useSpeciesList();

  const processSpeciesData = (speciesData: Species[] = []): SpeciesNode => {
    const classifications = speciesData.reduce<Record<string, Species[]>>((acc, species) => {
      const classification = species.classification || 'unknown';
      acc[classification] = [...(acc[classification] || []), species];
      return acc;
    }, {});

    return {
      name: 'species',
      children: Object.entries(classifications).map(([classification, list]) => ({
        name: classification,
        children: list.map(species => ({
          name: species.name,
          value: parseInt(species.average_lifespan) || 100,
          designation: species.designation,
          language: species.language,
        }))
      }))
    };
  };

  const chartData = processSpeciesData(species);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Species Classification Hierarchy
      </Typography>
      <Box sx={{ width: '100%', height: '100%', pt: 6, mt: -6 }}>
        <ResponsiveSunburst
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          id="name"
          value="value"
          cornerRadius={2}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
          colors={{ scheme: 'nivo' }}
          childColor={{ from: 'color', modifiers: [['brighter', 0.1]] }}
          enableArcLabels={true}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          tooltip={({ data }) => (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <strong>{data.name}</strong>
              {data.designation && <div>Designation: {data.designation}</div>}
              {data.language && <div>Language: {data.language}</div>}
              {data.value && <div>Average Lifespan: {data.value} years</div>}
            </div>
          )}
        />
      </Box>
    </Box>
  );
};