# Base stage: Lightweight image based on Alpine
FROM node:18-alpine AS base

# Install libc6-compat for native dependency compatibility
RUN apk add --no-cache libc6-compat && rm -rf /var/cache/apk/*

# Set default working directory
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps

# Copy dependency management files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on detected package manager
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lock file found. Exiting." && exit 1; \
  fi

# Stage 2: Build the project
FROM base AS builder

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy remaining files for build
COPY . .

# Disable Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application in standalone mode
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "No lock file found. Exiting." && exit 1; \
  fi

# Stage 3: Prepare production image
FROM base AS runner

# Set working directory
WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy necessary files for execution
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set non-root user
USER nextjs

# Expose listening port
EXPOSE 3000

# Startup command
CMD ["node", "server.js"]