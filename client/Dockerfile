# Use official Node.js runtime as parent image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application
COPY . .

# Expose the correct port
EXPOSE 5173

# Start the server
CMD ["npm", "run", "dev", "--", "--host"]
