
# Base image
# FROM node:22.12-alpine as base
FROM bitnami/node:22   as base

ENV NODE_ENV=production

# Install dependencies
FROM base as deps
WORKDIR /myapp

# Copy only necessary files for dependency installation
ADD package.json .npmrc ./
RUN npm install --include=dev

# Prepare production dependencies
FROM base as production-deps
WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json .npmrc ./
RUN npm prune --omit=dev

# Build the application
FROM base as build
WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD . .
RUN npm run build

# Final production image
FROM base
WORKDIR /myapp

# Copy production dependencies
COPY --from=production-deps /myapp/node_modules /myapp/node_modules

# Copy build artifacts and necessary files
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json

# Expose the port and start the app
ENV PORT=3000

# Expose the port your application runs on
EXPOSE 3000

CMD ["npm", "run", "start"]







# # Base Node.js image (adjust if needed)
# FROM node:18-alpine AS base

# # Install all node_modules (including dev dependencies)
# FROM base AS deps

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --production=false

# # Setup production node_modules
# FROM base AS production-deps

# ENV NODE_ENV=production

# WORKDIR /app

# COPY --from=deps /app/node_modules /app/node_modules
# ADD package*.json ./
# RUN npm ci --production

# # Build the app
# FROM base AS build

# WORKDIR /app

# COPY --from=deps /app/node_modules /app/node_modules

# ADD . .
# RUN npm run build  # Adjust if your build script name is different

# # Finally, build the production image with minimal footprint
# FROM base

# ENV NODE_ENV=production

# WORKDIR /app

# COPY --from=production-deps /app/node_modules /app/node_modules
# COPY --from=build /app/build /app/build
# COPY --from=build /app/public /app/public
# ADD . .

# EXPOSE 3000

# CMD ["npm", "run", "start"]  # Adjust if your start script name is different

