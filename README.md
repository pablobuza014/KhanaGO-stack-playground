# 🎯 KhanaGO Stack Playground

Proyecto multi-stack completo para gestión de gymkhanas con múltiples implementaciones de backend y frontend.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración de Puertos](#-configuración-de-puertos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
  - [Backends](#backends)
  - [Frontends](#frontends)
- [Cambiar el Backend en los Frontends](#-cambiar-el-backend-en-los-frontends)
- [Características](#-características)
- [Troubleshooting](#-troubleshooting)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## 📝 Descripción

Se pretende elegir el mejor backend y el mejor o los mejores frontend(s) en vista al desarrollo de una aplicación para la creación y participación de gymkhanas llamada KhanaGO.

Para ello, se hace una prueba de entornos tecnológicos con:

- **3 Backends diferentes** (Django, FastAPI, Spring Boot)
- **3 Frontends diferentes** (React Native, Flutter, Next.js)

En definitiva, este proyecto sirve como playground para comparar diferentes stacks tecnológicos implementando la misma funcionalidad (operaciones CRUD: ver, crear, actualizar y eliminar gymkhanas).

---

## Estructura del Proyecto

```
KhanaGO-stack-playground/
│
├── Django_BACKEND/         
│
├── FastAPI_BACKEND/
|
├── SpringBoot_BACKEND/
|
├── ReactNative_FRONTEND/
│
├── Flutter_FRONTEND/          
│
├── Next_FRONTEND/
│
├── .gitignore
├── notas.txt                      
└── README.md                      
```

---

## Tecnologías Utilizadas

### Backends
- **Django 4.x** + Django REST Framework
- **FastAPI** + Uvicorn
- **Spring Boot 3.x** + Maven

### Frontends
- **React Native** + Expo
- **Flutter** (Web/Mobile)
- **Next.js 14** + TypeScript

---

## Requisitos Previos

### Para Backends Python (Django y FastAPI)
- Python 3.8 o superior
- pip

### Para Backend Java (Spring Boot)
- Java JDK 11 o superior
- Maven 3.6+

### Para Frontends
- Node.js 18+ y npm
- Flutter SDK 3.0+ (para Flutter_FRONTEND)
- Android Studio o Xcode (para emuladores móviles)

---

## Configuración de Puertos

Los puertos predeterminados son:

| Servicio | Puerto |
|----------|--------|
| **FastAPI_BACKEND** | 8001 |
| **Django_BACKEND** | 8002 |
| **SpringBoot_BACKEND** | 8003 |
| **Next_FRONTEND** | 3000 |
| **ReactNative_FRONTEND** | 8081 |
| **Flutter_FRONTEND** | dinámico |

---

## Instalación y Ejecución

### Backends

#### Django_BACKEND (Puerto 8002)

```bash
# Navegar al directorio
cd Django_BACKEND

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows:
.\.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Realizar migraciones
python manage.py makemigrations
python manage.py migrate

# Iniciar servidor
python manage.py runserver 0.0.0.0:8002
```

**API disponible en:** `http://localhost:8002`  

---

#### FastAPI_BACKEND (Puerto 8001)

```bash
# Navegar al directorio
cd FastAPI_BACKEND

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows:
.\.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Actualizar pip
python -m pip install --upgrade pip

# Iniciar servidor
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

**API disponible en:** `http://localhost:8001`  

---

#### SpringBoot_BACKEND (Puerto 8003)

```bash
# Navegar al directorio
cd SpringBoot_BACKEND

# Compilar y ejecutar con Maven
mvn clean install
mvn spring-boot:run
```

**API disponible en:** `http://localhost:8003`

---

### Frontends

#### ReactNative_FRONTEND (Puerto 8081)

```bash
# Navegar al directorio
cd ReactNative_FRONTEND

# Instalar dependencias
npm install
npm i -D cross-env

# Iniciar con el backend deseado:

# Opción 1: Usar FastAPI (puerto 8001)
npm run start:fastapi

# Opción 2: Usar Django (puerto 8002)
npm run start:django

# Opción 3: Usar Spring Boot (puerto 8003)
npm run start:springboot

# Opción válida para cualquier backend:
npx expo start
# Recomendable limpiar caché
npx expo start --c
```

**App disponible en:** `http://localhost:8081`

---

#### Flutter_FRONTEND

```bash
# Navegar al directorio
cd Flutter_FRONTEND

# Ejecutar en Chrome (web)
flutter run -d chrome

# Ejecutar en emulador Android
flutter run -d android

# Ejecutar en emulador iOS (solo Mac)
flutter run -d ios

# Listar dispositivos disponibles
flutter devices
```

---

#### 3️⃣ Next_FRONTEND (Puerto 3000)

```bash
# Navegar al directorio
cd Next_FRONTEND

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
npm start
```

**App disponible en:** `http://localhost:3000`

---

## Cambiar el Backend en los Frontends

### ReactNative_FRONTEND

**Archivos a modificar:**
1. `app.config.js` - Línea con `const envFile`
2. `client.js` - Variable de entorno `API_URL`

```javascript
// app.config.js
const envFile = 
  process.env.BACKEND === 'fastapi' ? '.env.fastapi' :
  process.env.BACKEND === 'django' ? '.env.django' :
  process.env.BACKEND === 'springboot' ? '.env.springboot' :
  '.env.fastapi'; // default
```

**Usar scripts npm:**
```bash
npm run start:fastapi     # Puerto 8001
npm run start:django      # Puerto 8002
npm run start:springboot  # Puerto 8003
```

---

### Flutter_FRONTEND

**Archivo a modificar:** `lib/config.dart`

```dart
class Config {
  // Cambiar la URL según el backend deseado
  static const String baseUrl = 'http://localhost:8001'; // FastAPI
  // static const String baseUrl = 'http://localhost:8002'; // Django
  // static const String baseUrl = 'http://localhost:8003'; // Spring Boot
}
```

---

### Next_FRONTEND

**Archivos a modificar:**
1. `.env.local` - Variables de entorno
2. `src/lib/api.ts` - Configuración de API

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8001  # FastAPI
# NEXT_PUBLIC_API_URL=http://localhost:8002  # Django
# NEXT_PUBLIC_API_URL=http://localhost:8003  # Spring Boot

# src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8003" #FastAPI
#const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8002" #Django
#const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8003" #Spring Boot

```

---

## Características

- ✅ CRUD completo básico de Gymkhanas
- ✅ API REST documentada
- ✅ CORS configurado
- ✅ Validación de datos

---

## Troubleshooting

### Backend Python - "ModuleNotFoundError"
```bash
# Asegúrate de activar el entorno virtual (¡y en la ruta correcta! (intérprete de python correcto))
.\.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Reinstala las dependencias (donde proceda o aplique)
pip install -r requirements.txt
```

### Backend Python - "uvicorn no se reconoce"
```bash
# Instala uvicorn con el Python del venv activo
python -m pip install uvicorn fastapi
```

### Spring Boot - Error de compilación
```bash
# Limpia y recompila
mvn clean install -U
```

### React Native - Metro Bundler issues
```bash
# Limpia la caché
npx expo start -- --clear
```

### Flutter - Problemas de dependencias
```bash
# Limpia y reinstala
flutter clean
flutter pub get
```

### Next.js - Error de variables de entorno
```bash
# Asegúrate de tener .env.local
# Reinicia el servidor después de cambiar variables
```

### CORS Issues
Si tienes problemas de CORS, verifica:
- Los backends tienen CORS habilitado para `http://localhost:3000`, `http://localhost:8081`, etc.
- La URL del backend en el frontend coincide exactamente (sin barras finales extras)

---

## Licencia

Este proyecto es de código posiblemente ampliable y está disponible bajo la licencia MIT.


---

## Contacto

Para reportar bugs o solicitar features, contacta al creador.

---

**¡Gracias por usar KhanaGO Stack Playground!** 🎉