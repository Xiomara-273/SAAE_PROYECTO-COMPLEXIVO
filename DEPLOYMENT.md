# Guía Completa de Despliegue en Producción (SAAE)

Esta guía detalla el procedimiento paso a paso para desplegar la infraestructura **Full-Stack SAAE** en cualquier servidor en la nube (VPS) como **DigitalOcean**, **AWS EC2**, **Hetzner**, **Linode**, **Railway**, **Render** o servidores propios.

---

## 📋 Requisitos Previos del Servidor VPS

- Sistema Operativo: **Ubuntu 22.04 LTS** o **Debian 12**
- Mínimo **2 GB RAM** (4 GB recomendado)
- **Docker** y **Docker Compose** instalados
- Un nombre de dominio apuntando a la IP pública del servidor (ej. `mi-dominio.com`)

---

## 1. Instalación de Docker y Git en el Servidor (Ubuntu)

Conéctate por SSH a tu VPS y ejecuta:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl

# Instalación de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar tu usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

---

## 2. Clonación del Proyecto y Configuración de Producción

1. Clona tu repositorio en el servidor:
   ```bash
   git clone <URL_DE_TU_REPOSITO_GIT> /var/www/saae
   cd /var/www/saae
   ```

2. Copia la plantilla de variables de entorno de producción:
   ```bash
   cp .env.production .env
   ```

3. Modifica `.env` con tus credenciales reales y claves secretas:
   ```bash
   nano .env
   ```

---

## 3. Despliegue con Docker Compose (Producción)

Para construir e iniciar todos los servicios (`PostgreSQL`, `NestJS`, `Angular Nginx` y `n8n`) en un solo paso:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Verificar que todos los contenedores estén activos:
```bash
docker ps
```

---

## 4. Configurar Certificado SSL/HTTPS Gratuito con Let's Encrypt (Certbot)

Para habilitar **HTTPS (`https://mi-dominio.com`)**:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mi-dominio.com -d api.mi-dominio.com
```

Certbot renovará automáticamente los certificados SSL cada 90 días.

---

## 5. Respaldos Automáticos de la Base de Datos (PostgreSQL)

Para crear un respaldo diario automático de la base de datos PostgreSQL:

```bash
# Crear directorio de respaldos
mkdir -p /var/backups/saae

# Agregar tarea Cron diaria a las 3:00 AM
crontab -e
```

Añade esta línea al final del archivo crontab:
```cron
0 3 * * * docker exec saae-db-prod pg_dump -U saae_prod_user saae_prod_db | gzip > /var/backups/saae/backup_$(date +\%Y\%m\%d).sql.gz
```

---

## 🚀 ¡Sistema Desplegado!

- **Frontend App**: `https://mi-dominio.com`
- **Backend API REST**: `https://api.mi-dominio.com/api`
- **Automatización n8n**: `http://mi-dominio.com:5678`
