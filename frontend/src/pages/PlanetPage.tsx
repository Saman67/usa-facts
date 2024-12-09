import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePlanetById } from '../hooks/use-planets';
import { SEO } from '../components/SEO';
import { formatNumericValue } from '../utils/format';

const PlanetPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { planet, isLoading, isError } = usePlanetById(Number(id));

  const handleBack = () => {
    navigate('/planets');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Planets
        </Button>
        <Alert severity="error">
          Failed to fetch planet data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!planet) {
    return (
      <Box>
        <SEO 
          title="Planet Not Found"
          description="The requested Star Wars planet could not be found."
        />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Planets
        </Button>
        <Alert severity="warning">Planet not found.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={planet.name}
        description={`Learn about ${planet.name}, a planet with a ${planet.climate} climate and ${planet.terrain} terrain.`}
        type="article"
      />
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Planets
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              {planet.name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Physical Characteristics
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Climate:</strong> {planet.climate}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Terrain:</strong> {planet.terrain}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Surface Water:</strong> {formatNumericValue(planet.surface_water, { suffix: '%' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Diameter:</strong> {formatNumericValue(planet.diameter, { suffix: 'km' })}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Population & Orbital Data
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Population:</strong> {formatNumericValue(planet.population)}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Rotation Period:</strong> {formatNumericValue(planet.rotation_period, { suffix: 'hours' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Orbital Period:</strong> {formatNumericValue(planet.orbital_period, { suffix: 'days' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Gravity:</strong> {planet.gravity}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default PlanetPage; 