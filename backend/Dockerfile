# ------------ STAGE 1: Build Dependencies ------------ #
FROM node:lts-alpine AS builder

# Create app directory
WORKDIR /app

# Install only production dependencies first for caching
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy the rest of the app source
COPY . .

# Optionally: transpile, build static assets, etc.
# RUN npm run build

# Copy only production node_modules and built code
COPY --from=builder /app /app

# Set environment variables
ENV NODE_ENV=production

# Expose app port (update if yours is different)
EXPOSE 8000

# Run the app
CMD ["node", "src/index.js"]
