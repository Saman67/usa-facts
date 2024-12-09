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
- Node.js (20.9.0 or higher)
- npm or yarn

## Project Structure

The project consists of two main directories:
- `backend/` - NestJS application that serves as an API proxy to SWAPI
- `frontend/` - React application built with Vite and Material-UI

## Getting Started

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