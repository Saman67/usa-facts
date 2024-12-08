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
import { useFilmsList } from '../hooks/use-films';
import { SEO } from '../components/SEO';

const FilmsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { films, isLoading, isError } = useFilmsList({ searchTerm });

  const handleFilmClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/films/${id}`);
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
        title="Star Wars Films"
        description="Explore the complete Star Wars film saga. From A New Hope to the latest releases, discover the epic story of a galaxy far, far away."
      />
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'primary.main', mb: 4 }}
        >
          Star Wars Films
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Search Films"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        {isError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to fetch films data. Please try again later.
          </Alert>
        )}

        <Grid container spacing={3}>
          {films.map((film) => (
            <Grid item xs={12} sm={6} md={4} key={film.url}>
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
                <CardActionArea onClick={() => handleFilmClick(film.url)}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {film.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Episode {film.episode_id}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Released: {new Date(film.release_date).getFullYear()}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" noWrap>
                      Director: {film.director}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {films.length === 0 && !isLoading && !isError && (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No films found matching your search.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FilmsPage; 