FROM node:22-alpine
WORKDIR /app
RUN chown -R node:node /app
COPY --chown=node:node package.json package-lock.json ./
RUN apk add --no-cache \
    chromium \
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
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"
RUN npm install --omit=dev && npm cache clean --force && npx puppeteer browsers install chrome
COPY --chown=node:node . .
EXPOSE 5001
CMD ["node", "server.js"]
