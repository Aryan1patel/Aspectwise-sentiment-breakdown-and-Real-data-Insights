# Docker Deployment Guide

This project is fully dockerized for easy deployment.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### 3. Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Individual Service Commands

### Backend Only

```bash
cd backend
docker build -t absa-backend .
docker run -p 8000:8000 absa-backend
```

### Frontend Only

```bash
cd frontend-nextjs
docker build -t absa-frontend .
docker run -p 3000:3000 absa-frontend
```

## Development vs Production

### Development (with hot reload)

For development, continue using:
```bash
# Backend
cd backend && source ../backend_final_venv/bin/activate && uvicorn api:app --reload

# Frontend
cd frontend-nextjs && npm run dev
```

### Production (Docker)

For production deployment, use Docker Compose as shown above.

## Troubleshooting

### Port Already in Use

If ports 3000 or 8000 are already in use:

```bash
# Stop existing processes
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9

# Or change ports in docker-compose.yml
```

### Rebuild After Code Changes

```bash
docker-compose up --build
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Environment Variables

Create a `.env` file in the root directory for custom configuration:

```env
# Backend
BACKEND_PORT=8000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
FRONTEND_PORT=3000
```

## Notes

- The model file (`sentiment_model.joblib`) must be present in `backend/artifacts/` or `data/`
- Large data files are excluded via `.dockerignore` to keep image size small
- Frontend uses multi-stage build for optimized production image
