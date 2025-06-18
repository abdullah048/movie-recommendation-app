# Step 1: Install dependencies and build the app
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Serve with Next.js built-in server
FROM node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built app and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port
EXPOSE 3000

CMD ["npm", "start"]
