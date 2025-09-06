FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install system dependencies needed for Puppeteer
RUN apk add --no-cache \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    libstdc++ \
    udev \
    dbus \
    glib \
    fontconfig \
    && rm -rf /var/cache/apk/*

# Create a non-root user to run the app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Make sure the app directory is owned by our user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Copy package files first for caching
COPY --chown=appuser:appgroup package.json package-lock.json ./

# Install dependencies (Puppeteer downloads Chromium automatically)
RUN npm install 

# Copy the rest of the app
COPY --chown=appuser:appgroup . .

# Expose server port
EXPOSE 5001

# Start the server
CMD ["node", "server.js"]
