# Use a lightweight Node.js image as the base
FROM node:18-alpine as base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY src/ ./src

# Expose the port your API runs on
EXPOSE 3005

# Set environment variables (optional if you are using docker-compose to manage them)
ENV NODE_ENV=production

# Command to run the API
CMD ["node", "src/app.js"]
