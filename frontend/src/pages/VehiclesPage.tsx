import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  CardActionArea,
  Paper,
} from '@mui/material';
import { useVehiclesList } from '../hooks/use-vehicles';
import { SEO } from '../components/SEO';
import { VehicleSpeedComparison } from '../components/charts/VehicleSpeedComparison';

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { vehicles, isLoading, isError } = useVehiclesList({ searchTerm });

  const handleVehicleClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/vehicles/${id}`);
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

  return (
    <>
      <SEO 
        title="Star Wars Vehicles"
        description="Explore the ground and atmospheric vehicles of Star Wars. From speeder bikes to walkers, discover the diverse transportation that moves across the galaxy."
      />
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'primary.main', mb: 4 }}
        >
          Star Wars Vehicles
        </Typography>

        <Paper sx={{ height: '400px', mb: 4 }}>
          <VehicleSpeedComparison />
        </Paper>

        <TextField
          fullWidth
          variant="outlined"
          label="Search Vehicles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        {isError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to fetch vehicles data. Please try again later.
          </Alert>
        )}

        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.url}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea onClick={() => handleVehicleClick(vehicle.url)}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {vehicle.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Model: {vehicle.model}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Class: {vehicle.vehicle_class}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Manufacturer: {vehicle.manufacturer}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {vehicles.length === 0 && !isLoading && !isError && (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No vehicles found matching your search.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default VehiclesPage; 