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
import { useSpeciesById } from '../hooks/use-species';
import { SEO } from '../components/SEO';
import { formatNumericValue } from '../utils/format';

const SpeciesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { species, isLoading, isError } = useSpeciesById(Number(id));

  const handleBack = () => {
    navigate('/species');
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
          Back to Species
        </Button>
        <Alert severity="error">
          Failed to fetch species data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!species) {
    return (
      <Box>
        <SEO 
          title="Species Not Found"
          description="The requested Star Wars species could not be found."
        />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Species
        </Button>
        <Alert severity="warning">Species not found.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={species.name}
        description={`Learn about the ${species.name}, a ${species.classification} species from ${species.homeworld || 'unknown origins'}.`}
        type="article"
      />
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Species
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              {species.name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  General Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Classification:</strong> {species.classification}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Designation:</strong> {species.designation}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Language:</strong> {species.language}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Physical Characteristics
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Average Height:</strong> {formatNumericValue(species.average_height, { suffix: 'cm' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Average Lifespan:</strong> {formatNumericValue(species.average_lifespan, { suffix: 'years' })}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Skin Colors:</strong> {species.skin_colors}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Hair Colors:</strong> {species.hair_colors}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Eye Colors:</strong> {species.eye_colors}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SpeciesDetailPage; 