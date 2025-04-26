# Base image with Node.js 18 (Alpine variant for a smaller image)
# FROM node:22.12-alpine as base
FROM bitnami/node:22   as base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including devDependencies) in a separate build stage
FROM base AS deps
RUN npm install

# Build the application in a separate stage
COPY . . 
RUN npm run build  # Ensure you have a build script in package.json

# Create a production-only stage to reduce image size
FROM base AS production
WORKDIR /app

# Copy only the necessary files for production
COPY --from=deps /app/node_modules ./node_modules
COPY . . 

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port your application runs on
EXPOSE 4000

# Command to run your application
CMD ["npm", "run", "start"]
