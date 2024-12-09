# Use Node.js LTS version
FROM node:20.9.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose API port
EXPOSE 3010

# Start the server
CMD [ "npm", "run", "start:prod" ] 