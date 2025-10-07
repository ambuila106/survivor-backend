# Survivor Backend API

API backend para el juego Survivor desarrollado con Node.js, TypeScript, Express y MongoDB.

## 📋 Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **MongoDB** (versión 7.0 o superior)
- **Docker** y **Docker Compose** (opcional, para ejecución con contenedores)

## 🚀 Instrucciones de Ejecución

### Opción: Ejecución con Docker

1. **Clonar el repositorio**
   ```bash
   git clone [<repositorio>](https://github.com/ambuila106/survivor-backend.git)
   cd backend
   ```

2. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Detener los servicios**
   ```bash
   docker-compose down
   ```

## 📡 Endpoints Principales

### Survivor Routes (`/api/survivor`)
- `GET /` - Obtener todos los survivors
- `GET /:id` - Obtener survivor por ID
- `POST /join` - Unirse a un survivor
- `POST /pick` - Elegir equipo para una jornada
- `GET /:id/player/:playerId` - Obtener datos del jugador en un survivor

### Player Routes (`/api/players`)
- Gestión de jugadores

### Admin Routes (`/api/admin`)
- Funciones administrativas

### Leaderboard Routes (`/api/leaderboard`)
- Tablas de posiciones

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una **arquitectura por capas (Layered Architecture)** con separación clara de responsabilidades:

```
├── models/          # Capa de Datos (Data Layer)
├── repositories/    # Capa de Acceso a Datos (Data Access Layer)
├── services/        # Capa de Lógica de Negocio (Business Logic Layer)
├── controllers/     # Capa de Controladores (Presentation Layer)
├── routes/          # Capa de Rutas (Routing Layer)
├── middleware/      # Middleware de Express
├── types/           # Definiciones de tipos TypeScript
└── seeds/           # Datos de inicialización
```

## 🎯 Patrones de Diseño Implementados

### 1. **Repository Pattern**
- **Ubicación**: [`repositories/`](repositories/)
- **Propósito**: Abstrae el acceso a la base de datos y centraliza las consultas
- **Ejemplo**: [`SurvivorRepository`](repositories/survivorRepository.ts:8) encapsula todas las operaciones de base de datos relacionadas con Survivor


## 🗄️ Modelos de Datos


### GambleSurvivor
- Relación entre Player y Survivor
- Mantiene estado de vidas y eliminación


### PredictionSurvivor
- Predicciones de jugadores para partidos específicos (contiene el equipo que escogió el jugador)

## 🚦 Estado del Servidor

Una vez iniciado, el servidor estará disponible en:
- **Desarrollo**: `http://localhost:4300`
- **Docker**: `http://localhost:4300`

El servidor automáticamente:
1. Se conecta a MongoDB
2. Ejecuta el seeding inicial de datos
3. Configura todas las rutas de la API
