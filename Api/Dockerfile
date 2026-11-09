
# 1. Imagen oficial de PHP con versión definida
FROM php:8.3-cli-bookworm

# 2. Instalar librerías y extensiones necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    && docker-php-ext-install pdo_pgsql mbstring zip \
    && rm -rf /var/lib/apt/lists/*

# 3. Incorporar Composer
COPY --from=composer:2.8 /usr/bin/composer /usr/local/bin/composer

# 4. Definir el directorio de trabajo
WORKDIR /var/www/html

# 5. Copiar el proyecto Laravel al contenedor
COPY . .

# 6. Instalar las dependencias de PHP
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --optimize-autoloader

# 7. Documentar el puerto utilizado por Laravel
EXPOSE 8000

# 8. Comando para iniciar la aplicación
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
