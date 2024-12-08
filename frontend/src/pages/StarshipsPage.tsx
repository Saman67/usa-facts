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
import { useStarshipsList } from '../hooks/use-starships';

const StarshipsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { starships, isLoading, isError } = useStarshipsList({ searchTerm });

  const handleStarshipClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/starships/${id}`);
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
        Star Wars Starships
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Search Starships"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to fetch starships data. Please try again later.
        </Alert>
      )}

      <Grid container spacing={3}>
        {starships.map((starship) => (
          <Grid item xs={12} sm={6} md={4} key={starship.url}>
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
              <CardActionArea onClick={() => handleStarshipClick(starship.url)}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {starship.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Model: {starship.model}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Class: {starship.starship_class}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Manufacturer: {starship.manufacturer}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {starships.length === 0 && !isLoading && !isError && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No starships found matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default StarshipsPage; 