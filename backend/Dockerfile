# Use official Bun image
FROM oven/bun:1.1.38

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN bunx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Run migrations and start server
CMD bunx prisma migrate deploy && bun run src/index.ts
