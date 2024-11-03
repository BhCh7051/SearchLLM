# Step 1: Build the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src/ ./src

# Copy the public directory
COPY public/ ./public

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with a lightweight HTTP server
FROM nginx:alpine

# Copy the build files from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx will serve on
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
