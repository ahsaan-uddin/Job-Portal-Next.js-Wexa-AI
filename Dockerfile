# Multi-stage build for Next.js (compatible version)
FROM node:20-alpine AS deps
WORKDIR /app

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install build tools
RUN apk add --no-cache python3 make g++

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy all necessary files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]