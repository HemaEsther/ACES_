# ✅ Use Puppeteer's image (includes Chromium pre-installed)
FROM ghcr.io/puppeteer/puppeteer:latest

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all your code
COPY . .

# Expose your backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
