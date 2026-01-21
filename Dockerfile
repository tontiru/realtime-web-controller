# Stage 1: Build the client
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build the server
FROM node:20-alpine AS server-builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Stage 3: Production image
FROM node:20-alpine
WORKDIR /app

# Copy server dependencies and code
COPY --from=server-builder /app/node_modules ./node_modules
COPY --from=server-builder /app/package.json ./
COPY server.js .

# Copy built client
COPY --from=client-builder /app/client/build ./client/build

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "server.js"]
