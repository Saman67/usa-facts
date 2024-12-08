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
import { useFilmById } from '../hooks/use-films';
import { SEO } from '../components/SEO';

const FilmPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { film, isLoading, isError } = useFilmById(Number(id));

  const handleBack = () => {
    navigate('/films');
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
          Back to Films
        </Button>
        <Alert severity="error">
          Failed to fetch film data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!film) {
    return (
      <Box>
        <SEO 
          title="Film Not Found"
          description="The requested Star Wars film could not be found."
        />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Films
        </Button>
        <Alert severity="warning">Film not found.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={film.title}
        description={`Star Wars Episode ${film.episode_id}: ${film.title}. Directed by ${film.director}. ${film.opening_crawl.slice(0, 150)}...`}
        type="movie"
      />
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Films
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              {film.title}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Film Details
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Episode:</strong> {film.episode_id}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Director:</strong> {film.director}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Producer:</strong> {film.producer}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Release Date:</strong>{' '}
                  {new Date(film.release_date).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  Opening Crawl
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    whiteSpace: 'pre-line',
                    fontStyle: 'italic',
                    bgcolor: 'grey.50',
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  {film.opening_crawl}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default FilmPage; 