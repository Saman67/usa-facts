import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MovieIcon from '@mui/icons-material/Movie';
import PublicIcon from '@mui/icons-material/Public';
import PetsIcon from '@mui/icons-material/Pets';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { SEO } from '../components/SEO';

const categories = [
  {
    title: 'Characters',
    path: '/people',
    icon: PeopleIcon,
    description: 'Explore the characters of the Star Wars universe',
  },
  {
    title: 'Films',
    path: '/films',
    icon: MovieIcon,
    description: 'Browse the Star Wars film series',
  },
  {
    title: 'Planets',
    path: '/planets',
    icon: PublicIcon,
    description: 'Discover Star Wars planets and locations',
  },
  {
    title: 'Species',
    path: '/species',
    icon: PetsIcon,
    description: 'Learn about different Star Wars species',
  },
  {
    title: 'Starships',
    path: '/starships',
    icon: RocketLaunchIcon,
    description: 'View iconic Star Wars starships',
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    icon: DirectionsCarIcon,
    description: 'Explore Star Wars vehicles',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Star Wars Universe Explorer"
        description="Your gateway to the Star Wars galaxy. Explore characters, films, planets, species, starships, and vehicles from the iconic saga."
        type="website"
      />
      <Box>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            mb: 6,
            fontWeight: 'bold',
          }}
        >
          Star Wars Explorer
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(category.path)}
                    sx={{ height: '100%', p: 2 }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '100%',
                      }}
                    >
                      <Icon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h5" component="h2" gutterBottom>
                        {category.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage; 