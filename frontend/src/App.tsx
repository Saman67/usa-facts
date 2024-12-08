import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Container, Box, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PersonPage from './pages/PersonPage';
import FilmsPage from './pages/FilmsPage';
import FilmPage from './pages/FilmPage';
import PlanetsPage from './pages/PlanetsPage';
import PlanetPage from './pages/PlanetPage';
import SpeciesPage from './pages/SpeciesPage';
import SpeciesDetailPage from './pages/SpeciesDetailPage';
import StarshipsPage from './pages/StarshipsPage';
import StarshipPage from './pages/StarshipPage';
import VehiclesPage from './pages/VehiclesPage';
import VehiclePage from './pages/VehiclePage';
import Breadcrumb from './components/Breadcrumb';
import Header from './components/Header';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        '#root': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'html, body': {
              margin: 0,
              padding: 0,
              minHeight: '100vh',
              width: '100%',
            },
          }}
        />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              width: '100%',
              margin: 0,
              padding: 0,
            }}
          >
            <Header />
            <Container
              component="main"
              maxWidth="lg"
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                py: 3,
                px: { xs: 2, sm: 3 },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Breadcrumb />
              </Box>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/people/:id" element={<PersonPage />} />
                <Route path="/films" element={<FilmsPage />} />
                <Route path="/films/:id" element={<FilmPage />} />
                <Route path="/planets" element={<PlanetsPage />} />
                <Route path="/planets/:id" element={<PlanetPage />} />
                <Route path="/species" element={<SpeciesPage />} />
                <Route path="/species/:id" element={<SpeciesDetailPage />} />
                <Route path="/starships" element={<StarshipsPage />} />
                <Route path="/starships/:id" element={<StarshipPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/vehicles/:id" element={<VehiclePage />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
