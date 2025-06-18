# ------------ STAGE 1: Build ------------ #
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

# (Optional) Build if you're transpiling
# RUN npm run build

# ------------ STAGE 2: Production ------------ #
FROM node:lts-alpine AS production

WORKDIR /app

# Copy only production modules and source code
COPY --from=builder /app /app

ENV NODE_ENV=production

EXPOSE 8000

CMD ["node", "src/index.js"]
