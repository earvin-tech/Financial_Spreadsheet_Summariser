# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the server files
COPY . .

# Expose the server port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
