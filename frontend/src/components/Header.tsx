import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        width: '100%',
        bgcolor: 'white',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Star Wars Explorer
        </Typography>
        <Box>
          <IconButton
            color="primary"
            href="https://github.com/Saman67/usa-facts-star-wars-explorer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 