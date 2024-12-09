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
import { useSpeciesList } from '../hooks/use-species';
import { SEO } from '../components/SEO';
import { SpeciesHierarchy } from '../components/charts/SpeciesHierarchy';
const SpeciesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { species, isLoading, isError } = useSpeciesList({ searchTerm });

  const handleSpeciesClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/species/${id}`);
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
        title="Star Wars Species"
        description="Discover the diverse species that inhabit the Star Wars galaxy. From humans to Wookiees, learn about the unique races that make the universe rich and vibrant."
      />
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'primary.main', mb: 4 }}
        >
          Star Wars Species
        </Typography>

        <Paper sx={{ height: '460px', mb: 4 }}>
          <SpeciesHierarchy />
        </Paper>

        <TextField
          fullWidth
          variant="outlined"
          label="Search Species"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        {isError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            Failed to fetch species data. Please try again later.
          </Alert>
        )}

        <Grid container spacing={3}>
          {species.map((speciesItem) => (
            <Grid item xs={12} sm={6} md={4} key={speciesItem.url}>
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
                <CardActionArea onClick={() => handleSpeciesClick(speciesItem.url)}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {speciesItem.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Classification: {speciesItem.classification}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Designation: {speciesItem.designation}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Language: {speciesItem.language}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {species.length === 0 && !isLoading && !isError && (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No species found matching your search.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SpeciesPage; 