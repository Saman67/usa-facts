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
                Basic Information
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
                <strong>Cost:</strong>{' '}
                {parseInt(starship.cost_in_credits).toLocaleString()} credits
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Specifications
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Length:</strong> {starship.length} meters
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Max Speed:</strong> {starship.max_atmosphering_speed}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>MGLT:</strong> {starship.MGLT}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Capacity
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Crew:</strong> {starship.crew}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Passengers:</strong> {starship.passengers}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Cargo Capacity:</strong>{' '}
                {parseInt(starship.cargo_capacity).toLocaleString()} kg
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Consumables:</strong> {starship.consumables}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarshipPage; 