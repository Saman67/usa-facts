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
import { useVehicleById } from '../hooks/use-vehicles';

const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicle, isLoading, isError } = useVehicleById(Number(id));

  const handleBack = () => {
    navigate('/vehicles');
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
          Back to Vehicles
        </Button>
        <Alert severity="error">
          Failed to fetch vehicle data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Vehicles
        </Button>
        <Alert severity="warning">Vehicle not found.</Alert>
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
        Back to Vehicles
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            {vehicle.name}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Basic Information
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Model:</strong> {vehicle.model}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Manufacturer:</strong> {vehicle.manufacturer}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Class:</strong> {vehicle.vehicle_class}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Cost:</strong>{' '}
                {parseInt(vehicle.cost_in_credits).toLocaleString()} credits
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Specifications
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Length:</strong> {vehicle.length} meters
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Max Speed:</strong> {vehicle.max_atmosphering_speed}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Crew:</strong> {vehicle.crew}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Passengers:</strong> {vehicle.passengers}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Capacity
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Cargo Capacity:</strong>{' '}
                {parseInt(vehicle.cargo_capacity).toLocaleString()} kg
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Consumables:</strong> {vehicle.consumables}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VehiclePage; 