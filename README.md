# Práctica Final: Pipeline DevOps 

Proyecto de ejemplo que implementa una aplicación web simple (Node.js + Express) con pipeline CI/CD, contenedores Docker, pruebas automatizadas y monitoreo básico.

## Estructura
- `src/` - Código del servidor
- `public/` - Frontend estático (HTML/CSS/JS)
- `tests/` - Pruebas automatizadas
- `Dockerfile` - Imagen de la aplicación
- `docker-compose.yml` - Levantar app y volumen para la base de datos
- `.github/workflows/ci.yml` - Workflow de GitHub Actions (CI)

## Requisitos
- Node.js 18+
- Docker & Docker Compose (para despliegue local con contenedores)

## Desarrollo local
1. Instalar dependencias:
```
npm install
```
2. Inicializar la base de datos (crea la carpeta `data` y la DB):
```
npm run prepare-db
```
3. Ejecutar en modo desarrollo:
```
npm run dev
```
La app estará en `http://localhost:3000`.

## Ejecutar con Docker
1. Construir y levantar con Docker Compose:
```powershell
docker compose up --build
```
2. Acceder a `http://localhost:3000`.

## CI (GitHub Actions)
El workflow en `.github/workflows/ci.yml` ejecuta lint, tests y construye la imagen Docker.

## Monitoreo y Logs
- Logs: la app escribe logs en stdout usando `winston` (útil para recolección centralizada).
- Métricas: endpoint `/metrics` con métricas básicas (uptime, request_count).

## Pruebas
- Ejecutar pruebas unitarias e integración:
```
npm test
```

## Documentación del pipeline
El pipeline recomendado:
- `push` → GitHub Actions: lint, test, build image
- (opcional) publicar imagen al registry y desplegar en un entorno

## Entregables sugeridos
- Repositorio con todos los archivos
- PDF/Markdown con guía de instalación y manual de operaciones
- Slides para la presentación y demo en vivo
