# 🎯 KhanaGO Stack Playground

Este repositorio se desarrolló en el marco de un Trabajo de Fin de Grado, con el objetivo de comparar combinaciones de *backend* y *frontend* y sustentar la elección del *stack* tecnológico definitivo del producto KhanaGO, una plataforma para la gestión, creación y participación en *gymkhanas*.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Demo](#demo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Configuración de Puertos](#configuración-de-puertos)
- [Instalación y Ejecución](#instalación-y-ejecución)
  - [Backends](#backends)
  - [Frontends](#frontends)
- [Cambiar el Backend en los Frontends](#cambiar-el-backend-en-los-frontends)
- [Características](#características)
- [Troubleshooting](#troubleshooting)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

Se pretende elegir el mejor *backend* y el mejor o los mejores *frontend(s)* en vista al desarrollo de una aplicación para la gestión, creación y participación de *gymkhanas* llamada KhanaGO.

Para ello, se hace una prueba de entornos tecnológicos con:

- **3 *Backends* diferentes** (Django, FastAPI, Spring Boot)
- **3 *Frontends* diferentes** (React Native, Flutter, Next.js)

En definitiva, este proyecto sirve como *playground* para comparar diferentes *stacks* tecnológicos implementando la misma funcionalidad (operaciones CRUD: ver, crear, actualizar y eliminar *gymkhanas*).

Para una descripción técnica detallada del *stack* tecnológico (arquitectura, modelo de dominio, *endpoints*, análisis de cada *backend* y *frontend*, decisión final y justificación), consultar el documento del Trabajo de Fin de Grado sobre el proyecto KhanaGO.

---

## Demo

[Ver demo](Multimedia/khanago-demo.mp4)

---

## Estructura del Proyecto

```
├── Django_BACKEND
│   ├── django_backend
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── gymkhanas
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── FastAPI_BACKEND
│   ├── app
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── requirements.txt
│   ├── .gitignore
│   └── dev.db
├── Flutter_FRONTEND
│   ├── android/
│   ├── ios/
│   ├── linux/
│   ├── macos/
│   ├── windows/
│   ├── web/
│   ├── test/
│   ├── lib
│   │   ├── models
│   │   │   └── gymkhana.dart
│   │   ├── services
│   │   │   └── api.dart
│   │   ├── config.dart
│   │   └── main.dart
│   ├── pubspec.yaml
│   └── pubspec.lock
├── Next_FRONTEND
│   ├── src
│   │   ├── app
│   │   │   ├── global.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   └── GymkhanasScreen.tsx
│   │   └── lib
│   │       └── api.ts
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── ReactNative_FRONTEND
│   ├── .expo
│   │   ├── devices.json
│   │   ├── README.md
│   │   └── settings.json
│   ├── src
│   │   ├── api
│   │   │   └── client.js
│   │   ├── navigation
│   │   │   └── index.js
│   │   ├── screens
│   │   │   └── GymkhanasScreen.js
│   │   └── App.js
│   ├── app.config.js
│   ├── babel.config.js
│   ├── index.js
│   ├── jsconfig.json
│   ├── package-lock.json
│   └── package.json
├── SpringBoot_BACKEND
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── springboot_backend
│   │   │   │       └── khanago
│   │   │   │           ├── GymkhanaController.java
│   │   │   │           ├── HomeController.java
│   │   │   │           ├── KhanagoApplication.java
│   │   │   │           └── WebConfig.java
│   │   │   └── resources
│   │   │       └── application.properties
│   │   └── test
│   │       └── java
│   │           └── springboot_backend
│   │               └── khanago
│   │                   └── KhanagoApplicationTests.java
│   ├── .gitattributes
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
├── Multimedia/
├── .gitignore
├── info.md
├── stack-tecnologico.md
└── README.md
```

---

## Tecnologías Utilizadas

### *Backends*
- **Django 5.2.7** + Django REST Framework 3.16.1
- **FastAPI** + Uvicorn
- **Spring Boot 3.5.6** + Maven

### *Frontends*
- **React Native** + Expo
- **Flutter** (Web/Mobile)
- **Next.js 14** + TypeScript

---

## Requisitos Previos

### Para Backends Python (Django y FastAPI)
- Python 3.10 o superior
- pip

### Para Backend Java (Spring Boot)
- Java JDK 21 o superior
- Maven 3.6+

### Para Frontends
- Node.js 18+ y npm
- Flutter SDK 3.5.0+ (para Flutter_FRONTEND)
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

### *Backends*

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

### *Frontends*

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

#### Next_FRONTEND (Puerto 3000)

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

## Cambiar el *Backend* en los *Frontends*

### ReactNative_FRONTEND

**Archivos a modificar:**
1. `app.config.js` - Línea con `const envFile`
2. `src/api/client.js` - Variable `HOST`

```javascript
// app.config.js
const envFile = process.env.ENVFILE || ".env.springboot";
const map = {
  ".env.django":     { API_BASE_URL: "http://localhost:8002", API_BASE_PATH: "" },
  ".env.fastapi":    { API_BASE_URL: "http://localhost:8001", API_BASE_PATH: "" },
  ".env.springboot": { API_BASE_URL: "http://localhost:8003", API_BASE_PATH: "" },
};
```

```javascript
// src/api/client.js
const HOST = "http://localhost:8003"; // Cambiar puerto: 8001 (FastAPI), 8002 (Django), 8003 (Spring Boot)
```

**Usar scripts npm:**
```bash
npm run start:fastapi     # Puerto 8001
npm run start:django      # Puerto 8002
npm run start:spring      # Puerto 8003
```

---

### Flutter_FRONTEND

**Archivo a modificar:** `lib/config.dart`

Cambiar el puerto en la constante `backendApi` según el *backend* deseado (8001, 8002, 8003):

```dart
class Config {
  static String get baseUrl {
    const backendApi = 'http://localhost:8003'; // Cambiar puerto aquí
    if (kIsWeb) return backendApi;
    if (Platform.isAndroid) return 'http://10.0.2.2:8003'; // Mismo puerto aquí
    return backendApi;
  }
}
```

---

### Next_FRONTEND

**Archivo a modificar:** `src/lib/api.ts` - Cambiar el puerto en el valor por defecto:

```typescript
// src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8001"; // FastAPI
// const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8002"; // Django
// const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8003"; // Spring Boot
```

Alternativamente, se puede crear un fichero `.env.local` con la variable `NEXT_PUBLIC_API_BASE`:

```bash
# .env.local
NEXT_PUBLIC_API_BASE=http://localhost:8001  # FastAPI
# NEXT_PUBLIC_API_BASE=http://localhost:8002  # Django
# NEXT_PUBLIC_API_BASE=http://localhost:8003  # Spring Boot
```

---

## Características

- ✅ CRUD completo básico de *Gymkhanas*
- ✅ API REST documentada
- ✅ CORS configurado
- ✅ Validación de datos

---

## *Troubleshooting*

### *Backend* Python - "ModuleNotFoundError"
```bash
# Asegúrate de activar el entorno virtual (¡y en la ruta correcta! (intérprete de python correcto))
.\.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Reinstala las dependencias (donde proceda o aplique)
pip install -r requirements.txt
```

### *Backend* Python - "uvicorn no se reconoce"
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
# Asegúrate de tener ".env.local"
# Reinicia el servidor después de cambiar variables
```

### CORS Issues
Si tienes problemas de CORS, verifica:
- Los *backends* tienen CORS habilitado para `http://localhost:3000`, `http://localhost:8081`, etc.
- La URL del *backend* en el *frontend* coincide exactamente (sin barras finales extras)

---


## Licencia

Este repositorio, de carácter académico y exploratorio, fue desarrollado para sustentar la elección del *stack* tecnológico del producto KhanaGO en el marco de un Trabajo de Fin de Grado. 
Queda disponible bajo la licencia MIT para su uso, modificación o ampliación por terceros.


---

## Contacto

Para reportar *bugs* o solicitar *features*, contacta al creador.

---



<img src="Multimedia/TFG,%20Logo%20KhanaGO.png" alt="Logo KhanaGO" width="280">

**¡Gracias por usar KhanaGO Stack Playground!**
