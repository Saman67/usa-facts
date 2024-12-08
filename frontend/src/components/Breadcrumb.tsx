import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useFilmById } from '../hooks/use-films';
import { usePeopleById } from '../hooks/use-people';
import { usePlanetById } from '../hooks/use-planets';
import { useSpeciesById } from '../hooks/use-species';
import { useStarshipById } from '../hooks/use-starships';
import { useVehicleById } from '../hooks/use-vehicles';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Get the entity type and ID from the path
  const entityType = pathnames[0];
  const entityId = pathnames[1];

  // Fetch data based on entity type if we have an ID
  const { film } = useFilmById(Number(entityType === 'films' ? entityId : 0));
  const { person } = usePeopleById(Number(entityType === 'people' ? entityId : 0));
  const { planet } = usePlanetById(Number(entityType === 'planets' ? entityId : 0));
  const { species } = useSpeciesById(Number(entityType === 'species' ? entityId : 0));
  const { starship } = useStarshipById(Number(entityType === 'starships' ? entityId : 0));
  const { vehicle } = useVehicleById(Number(entityType === 'vehicles' ? entityId : 0));

  // Map path segments to readable names
  const getPathName = (path: string) => {
    const names: { [key: string]: string } = {
      people: 'Characters',
      films: 'Films',
      planets: 'Planets',
      species: 'Species',
      starships: 'Starships',
      vehicles: 'Vehicles',
    };
    return names[path] || path;
  };

  // Get the detail name based on entity type and data
  const getDetailName = (type: string, id: string) => {
    if (!id) return getPathName(type);

    switch (type) {
      case 'films':
        return film?.title || 'Film Details';
      case 'people':
        return person?.name || 'Character Details';
      case 'planets':
        return planet?.name || 'Planet Details';
      case 'species':
        return species?.name || 'Species Details';
      case 'starships':
        return starship?.name || 'Starship Details';
      case 'vehicles':
        return vehicle?.name || 'Vehicle Details';
      default:
        return 'Details';
    }
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        sx={{ 
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // If it's a numeric ID, show the entity name/title
        if (!isNaN(Number(value))) {
          return (
            <Typography key={to} color="text.primary">
              {getDetailName(pathnames[0], value)}
            </Typography>
          );
        }

        return last ? (
          <Typography key={to} color="text.primary">
            {getPathName(value)}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            to={to}
            key={to}
            color="inherit"
            sx={{ 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {getPathName(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb; 