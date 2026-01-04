
# Stage 1: Build Frontend

FROM node:18-alpine AS build          # Use Node.js to build the frontend

WORKDIR /app                          # Set working directory inside container

COPY package*.json ./                 # Copy dependency files first (for Docker cache)
RUN npm install                       # Install frontend dependencies

COPY . .                              # Copy full frontend source code
RUN npm run build                     # Build app → generates /app/dist (static files)



# Stage 2: Run with Nginx

FROM nginx:alpine                     # Lightweight Nginx for production

RUN rm /etc/nginx/conf.d/default.conf # Remove default Nginx config

COPY nginx.conf /etc/nginx/conf.d/default.conf  # Custom Nginx config (SPA + routing)

COPY --from=build /app/dist /usr/share/nginx/html
# Copy built static files from build stage to Nginx web root

EXPOSE 80                             # App listens on port 80 (documentation)

CMD ["nginx", "-g", "daemon off;"]    # Start Nginx in foreground
