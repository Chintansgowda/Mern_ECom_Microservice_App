FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy application source
COPY . .

# Product service runs on 9000
EXPOSE 9000

# Start the server
CMD ["npm", "start"]
