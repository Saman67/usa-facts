# Build stage
FROM node:20.9.0-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application and verify output
RUN npm run build && \
    echo "Build output:" && \
    ls -la dist/ && \
    echo "Index.html contents:" && \
    cat dist/index.html

# Production stage
FROM nginx:alpine

# Create directory if it doesn't exist
RUN mkdir -p /usr/share/nginx/html

# Copy built assets from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

# Verify the copied files
RUN echo "Nginx html directory contents:" && \
    ls -la /usr/share/nginx/html && \
    echo "Nginx configuration:" && \
    mkdir -p /etc/nginx/conf.d

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx with debug logging
CMD ["nginx-debug", "-g", "daemon off;"] 