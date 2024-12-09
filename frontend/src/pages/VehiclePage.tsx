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
import { SEO } from '../components/SEO';
import { formatNumericValue } from '../utils/format';

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
        <SEO 
          title="Vehicle Not Found"
          description="The requested Star Wars vehicle could not be found."
        />
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
    <>
      <SEO 
        title={vehicle.name}
        description={`Learn about the ${vehicle.name}, a ${vehicle.vehicle_class} class vehicle manufactured by ${vehicle.manufacturer}.`}
        type="article"
      />
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
                  General Information
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
                  <strong>Cost:</strong> {formatNumericValue(vehicle.cost_in_credits)}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Technical Specifications
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Length:</strong> {formatNumericValue(vehicle.length, {suffix: 'meters'})}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Crew:</strong> {formatNumericValue(vehicle.crew, {suffix: 'crew'})}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Passengers:</strong> {formatNumericValue(vehicle.passengers, {suffix: 'passengers'})}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Cargo Capacity:</strong> {formatNumericValue(vehicle.cargo_capacity, {suffix: 'kg'})}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  Performance
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Max Atmosphering Speed:</strong> {formatNumericValue(vehicle.max_atmosphering_speed, {suffix: 'km/h'})}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default VehiclePage; 