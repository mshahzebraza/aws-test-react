# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Set environment variable for the build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the app
RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

EXPOSE 4173

# Start serve (Use the serve package to serve the built assets on the specified port)
CMD ["serve", "-s", "dist", "-l", "4173"] 


# docker build -t aws-test-react --build-arg VITE_API_URL=http://localhost:3000/test .
