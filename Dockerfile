# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build   # outputs /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for frontend
EXPOSE 80

# Nginx runs by default, no CMD needed
