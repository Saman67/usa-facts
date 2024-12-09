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
import { useStarshipById } from '../hooks/use-starships';
import { SEO } from '../components/SEO';
import { formatNumericValue } from '../utils/format';

const StarshipPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { starship, isLoading, isError } = useStarshipById(Number(id));

  const handleBack = () => {
    navigate('/starships');
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
          Back to Starships
        </Button>
        <Alert severity="error">
          Failed to fetch starship data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!starship) {
    return (
      <Box>
        <SEO 
          title="Starship Not Found"
          description="The requested Star Wars starship could not be found."
        />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Starships
        </Button>
        <Alert severity="warning">Starship not found.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={starship.name}
        description={`Learn about the ${starship.name}, a ${starship.starship_class} class starship manufactured by ${starship.manufacturer}.`}
        type="article"
      />
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Starships
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              {starship.name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  General Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Model:</strong> {starship.model}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Manufacturer:</strong> {starship.manufacturer}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Class:</strong> {starship.starship_class}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Cost:</strong> {formatNumericValue(starship.cost_in_credits)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Technical Specifications
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Length:</strong> {formatNumericValue(starship.length, { suffix: 'meters' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Crew:</strong> {formatNumericValue(starship.crew, { suffix: 'crew' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Passengers:</strong> {formatNumericValue(starship.passengers, { suffix: 'passengers' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Cargo Capacity:</strong> {formatNumericValue(starship.cargo_capacity, { suffix: 'kg' })}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  Performance
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Max Atmosphering Speed:</strong> {formatNumericValue(starship.max_atmosphering_speed, { suffix: 'km/h' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Hyperdrive Rating:</strong> {formatNumericValue(starship.hyperdrive_rating)}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>MGLT:</strong> {formatNumericValue(starship.MGLT, { suffix: 'MGLT' })}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default StarshipPage; 