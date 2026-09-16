# Etapa 1: Build de la aplicación Angular 21
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx de producción
FROM nginx:alpine

# Limpiar archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/sistema-analitica-asistencia/browser /usr/share/nginx/html

# Asegurar que index.csr.html sirva como index.html para Angular
RUN if [ -f /usr/share/nginx/html/index.csr.html ] && [ ! -f /usr/share/nginx/html/index.html ]; then cp /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

