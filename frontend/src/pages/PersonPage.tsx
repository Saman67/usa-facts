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
import { usePeopleById } from '../hooks/use-people';
import { SEO } from '../components/SEO';

const PersonPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { person, isLoading, isError } = usePeopleById(Number(id));

  const handleBack = () => {
    navigate('/people');
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
          Back to Characters
        </Button>
        <Alert severity="error">
          Failed to fetch character data. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!person) {
    return (
      <Box>
        <SEO 
          title="Character Not Found"
          description="The requested Star Wars character could not be found."
        />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Characters
        </Button>
        <Alert severity="warning">Character not found.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={person.name}
        description={`Learn about ${person.name}, a Star Wars character. Born in ${person.birth_year}, ${person.gender === 'n/a' ? 'they are' : `${person.gender} is`} known for their ${person.eye_color} eyes and ${person.hair_color} hair.`}
        type="profile"
      />
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Characters
        </Button>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              {person.name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Personal Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Birth Year:</strong> {person.birth_year}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Gender:</strong> {person.gender}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Height:</strong> {person.height} cm
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Mass:</strong> {person.mass} kg
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="primary">
                  Physical Characteristics
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Eye Color:</strong> {person.eye_color}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Hair Color:</strong> {person.hair_color}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Skin Color:</strong> {person.skin_color}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Additional sections for related data could be added here */}
        {/* For example: Films, Vehicles, Starships, etc. */}
      </Box>
    </>
  );
};

export default PersonPage; 