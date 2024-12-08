import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        px: { xs: 2, sm: 3 },
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Data provided by{' '}
          <Link
            href="https://swapi.dev"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            SWAPI
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Star Wars Explorer. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 