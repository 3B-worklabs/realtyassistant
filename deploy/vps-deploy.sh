#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/realtyassistant"
REPO_URL="https://github.com/3B-worklabs/realtyassistant.git"
DOMAIN="realtyassistant.owsdigital.in"
HOST_PORT="3010"
NGINX_AVAILABLE="/etc/nginx/sites-available/realtyassistant"
NGINX_ENABLED="/etc/nginx/sites-enabled/realtyassistant"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed on this VPS."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose v2 is not available on this VPS."
  exit 1
fi

mkdir -p /var/www

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

HOST_PORT="$HOST_PORT" docker compose up --build -d

cp "$APP_DIR/deploy/nginx/realtyassistant.conf" "$NGINX_AVAILABLE"
ln -sfn "$NGINX_AVAILABLE" "$NGINX_ENABLED"

nginx -t
systemctl reload nginx

echo "App is running on http://127.0.0.1:$HOST_PORT"
echo "Nginx is configured for http://$DOMAIN"
echo "Run this after confirming the domain shows Realty Assistant:"
echo "certbot --nginx -d $DOMAIN"
