# Star Wars Explorer

A full-stack application that allows users to explore the Star Wars universe using data from SWAPI (Star Wars API). Built with NestJS for the backend and React with Material-UI for the frontend.

## Features

- Browse and search Star Wars characters, films, planets, species, starships, and vehicles
- Detailed view for each entity with formatted data presentation
- Responsive design that works on both desktop and mobile devices
- Client-side filtering and search functionality
- SEO-friendly with meta tags for better search engine visibility

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (20.9.0 or higher) and npm/yarn for local development
- Docker and Docker Compose for containerized deployment

## Project Structure

The project consists of two main directories:
- `backend/` - NestJS application that serves as an API proxy to SWAPI
- `frontend/` - React application built with Vite and Material-UI

## Running with Docker Compose

The easiest way to run the application is using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system
2. Clone the repository
3. Run the following command in the root directory:

```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3010
- API Documentation: http://localhost:3010/api

To stop the application:
```bash
docker compose down
```

## Local Development Setup

If you prefer to run the applications locally for development:

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3010`. You can access the Swagger documentation at `http://localhost:3010/api`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Documentation

The backend provides a RESTful API with the following endpoints:

- `/films` - Star Wars films
- `/people` - Star Wars characters
- `/planets` - Star Wars planets
- `/species` - Star Wars species
- `/starships` - Star Wars starships
- `/vehicles` - Star Wars vehicles

Each endpoint supports:
- GET / - List all items
- GET /:id - Get a specific item by ID

For detailed API documentation, visit `http://localhost:3010/api` after starting the backend server.

## Development

### Backend Development

The backend is built with:
- NestJS - A progressive Node.js framework
- @nestjs/swagger - API documentation
- @nestjs/axios - HTTP client for proxying requests to SWAPI

Key files:
- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root module configuration
- `src/*/` - Feature modules for each entity

### Frontend Development

The frontend is built with:
- React - UI library
- Vite - Build tool
- Material-UI - Component library
- React Query - Data fetching and caching
- React Router - Client-side routing
- React Helmet Async - Document head management

Key files:
- `src/App.tsx` - Root component
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/hooks/` - Custom hooks for data fetching
- `src/utils/` - Utility functions

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 