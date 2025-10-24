# Multi-stage Dockerfile para WhatsApp Viewer Frontend
# ====================
# Stage 1: Build
# ====================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências (incluindo devDependencies para o build)
RUN npm ci

# Copiar código fonte
COPY . .

# Aceitar variável de ambiente no build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build do frontend (Vite)
RUN npm run build

# ====================
# Stage 2: Production (Nginx)
# ====================
FROM nginx:alpine

# Copiar build do frontend para nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
