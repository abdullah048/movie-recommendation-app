# syntax=docker/dockerfile:1

### Step 1: Build the app
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy all source code
COPY . .

# Build the app
RUN npm run build

### Step 2: Create minimal image
FROM node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for better security
RUN addgroup -S app && adduser -S app -G app
USER app

# Copy only the necessary files from the standalone build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["node", "server.js"]
