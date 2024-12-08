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
} from '@mui/material';
import { usePlanetsList } from '../hooks/use-planets';

const PlanetsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { planets, isLoading, isError } = usePlanetsList({ searchTerm });

  const handlePlanetClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/planets/${id}`);
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
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main', mb: 4 }}
      >
        Star Wars Planets
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Search Planets"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to fetch planets data. Please try again later.
        </Alert>
      )}

      <Grid container spacing={3}>
        {planets.map((planet) => (
          <Grid item xs={12} sm={6} md={4} key={planet.url}>
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
              <CardActionArea onClick={() => handlePlanetClick(planet.url)}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {planet.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Climate: {planet.climate}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Terrain: {planet.terrain}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Population: {parseInt(planet.population).toLocaleString() || 'Unknown'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {planets.length === 0 && !isLoading && !isError && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No planets found matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default PlanetsPage; 