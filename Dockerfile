# Use Node.js 18 LTS version with Alpine Linux for smaller image
FROM node:18-alpine
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm ci --only=production
# Copy application code
COPY . .
# Expose port
EXPOSE 3000
# Set environment variables (optional)
# NODE_ENV=production
# Start the application
CMD ["node", "server.js"]