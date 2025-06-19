# syntax=docker/dockerfile:1

### ---------- Base Image ---------- ###
FROM node:18-alpine AS base

WORKDIR /app
ENV NODE_ENV=production

# Fixes issues with some packages on Alpine
RUN apk add --no-cache libc6-compat

### ---------- Install Dependencies ---------- ###
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm ci

### ---------- Builder ---------- ###
FROM base AS builder

# Copy deps
COPY --from=deps /app/node_modules ./node_modules

# Copy app source
COPY . .

# Compile next.config.ts to JS
RUN npx tsc next.config.ts --outDir .next-ts-config

# Replace next.config.js if needed
RUN cp .next-ts-config/next.config.js ./next.config.js

# Build app (this includes App Router pages and server components)
RUN npm run build

### ---------- Runner ---------- ###
FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy required files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Use non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
