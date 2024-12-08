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
import { usePeopleList } from '../hooks/use-people';

const PeoplePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { people, isLoading, isError } = usePeopleList({ searchTerm });

  const handlePersonClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/people/${id}`);
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
        Star Wars Characters
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Search Characters"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to fetch people data. Please try again later.
        </Alert>
      )}

      <Grid container spacing={3}>
        {people.map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person.url}>
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
              <CardActionArea onClick={() => handlePersonClick(person.url)}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {person.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Birth Year: {person.birth_year}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {people.length === 0 && !isLoading && !isError && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No characters found matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default PeoplePage; 