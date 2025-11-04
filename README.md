# 🎯 KhanaGO Stack Playground

Proyecto multi-stack completo para gestión de gymkhanas con múltiples implementaciones de backend y frontend.

## Tabla de Contenidos

- [Descripción](#-descripción)
- [Demo](#demo)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración de Puertos](#-configuración-de-puertos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
  - [Backends](#backends)
  - [Frontends](#frontends)
- [Cambiar el Backend en los Frontends](#-cambiar-el-backend-en-los-frontends)
- [Características](#características)
- [Troubleshooting](#troubleshooting)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

Se pretende elegir el mejor backend y el mejor o los mejores frontend(s) en vista al desarrollo de una aplicación para la creación y participación de gymkhanas llamada KhanaGO.

Para ello, se hace una prueba de entornos tecnológicos con:

- **3 Backends diferentes** (Django, FastAPI, Spring Boot)
- **3 Frontends diferentes** (React Native, Flutter, Next.js)

En definitiva, este proyecto sirve como playground para comparar diferentes stacks tecnológicos implementando la misma funcionalidad (operaciones CRUD: ver, crear, actualizar y eliminar gymkhanas).

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
│   │   ├── migrations
│   │   │   ├── __init__.py
│   │   │   ├── 0001_initial.py
│   │   │   └── 0002_remove_gymkhana_ends_at_remove_gymkhana_starts_at.py
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
│   ├── android
│   │   ├── app
│   │   │   ├── src
│   │   │   │   ├── debug
│   │   │   │   │   └── AndroidManifest.xml
│   │   │   │   ├── main
│   │   │   │   │   ├── kotlin
│   │   │   │   │   │   └── com
│   │   │   │   │   │       └── example
│   │   │   │   │   │           └── flutter_frontend
│   │   │   │   │   │               └── MainActivity.kt
│   │   │   │   │   ├── res
│   │   │   │   │   │   ├── drawable
│   │   │   │   │   │   │   └── launch_background.xml
│   │   │   │   │   │   ├── drawable-v21
│   │   │   │   │   │   │   └── launch_background.xml
│   │   │   │   │   │   ├── mipmap-hdpi
│   │   │   │   │   │   │   └── ic_launcher.png
│   │   │   │   │   │   ├── mipmap-mdpi
│   │   │   │   │   │   │   └── ic_launcher.png
│   │   │   │   │   │   ├── mipmap-xhdpi
│   │   │   │   │   │   │   └── ic_launcher.png
│   │   │   │   │   │   ├── mipmap-xxhdpi
│   │   │   │   │   │   │   └── ic_launcher.png
│   │   │   │   │   │   ├── mipmap-xxxhdpi
│   │   │   │   │   │   │   └── ic_launcher.png
│   │   │   │   │   │   ├── values
│   │   │   │   │   │   │   └── styles.xml
│   │   │   │   │   │   └── values-night
│   │   │   │   │   │       └── styles.xml
│   │   │   │   │   └── AndroidManifest.xml
│   │   │   │   └── profile
│   │   │   │       └── AndroidManifest.xml
│   │   │   └── build.gradle.kts
│   │   ├── gradle
│   │   │   └── wrapper
│   │   │       └── gradle-wrapper.properties
│   │   ├── .gitignore
│   │   ├── build.gradle.kts
│   │   ├── gradle.properties
│   │   └── settings.gradle.kts
│   ├── ios
│   │   ├── Flutter
│   │   │   ├── AppFrameworkInfo.plist
│   │   │   ├── Debug.xcconfig
│   │   │   └── Release.xcconfig
│   │   ├── Runner
│   │   │   ├── Assets.xcassets
│   │   │   │   ├── AppIcon.appiconset
│   │   │   │   │   ├── Contents.json
│   │   │   │   │   ├── Icon-App-1024x1024@1x.png
│   │   │   │   │   ├── Icon-App-20x20@1x.png
│   │   │   │   │   ├── Icon-App-20x20@2x.png
│   │   │   │   │   ├── Icon-App-20x20@3x.png
│   │   │   │   │   ├── Icon-App-29x29@1x.png
│   │   │   │   │   ├── Icon-App-29x29@2x.png
│   │   │   │   │   ├── Icon-App-29x29@3x.png
│   │   │   │   │   ├── Icon-App-40x40@1x.png
│   │   │   │   │   ├── Icon-App-40x40@2x.png
│   │   │   │   │   ├── Icon-App-40x40@3x.png
│   │   │   │   │   ├── Icon-App-60x60@2x.png
│   │   │   │   │   ├── Icon-App-60x60@3x.png
│   │   │   │   │   ├── Icon-App-76x76@1x.png
│   │   │   │   │   ├── Icon-App-76x76@2x.png
│   │   │   │   │   └── Icon-App-83.5x83.5@2x.png
│   │   │   │   └── LaunchImage.imageset
│   │   │   │       ├── Contents.json
│   │   │   │       ├── LaunchImage.png
│   │   │   │       ├── LaunchImage@2x.png
│   │   │   │       ├── LaunchImage@3x.png
│   │   │   │       └── README.md
│   │   │   ├── Base.lproj
│   │   │   │   ├── LaunchScreen.storyboard
│   │   │   │   └── Main.storyboard
│   │   │   ├── AppDelegate.swift
│   │   │   ├── Info.plist
│   │   │   └── Runner-Bridging-Header.h
│   │   ├── Runner.xcodeproj
│   │   │   ├── project.xcworkspace
│   │   │   │   ├── xcshareddata
│   │   │   │   │   ├── IDEWorkspaceChecks.plist
│   │   │   │   │   └── WorkspaceSettings.xcsettings
│   │   │   │   └── contents.xcworkspacedata
│   │   │   ├── xcshareddata
│   │   │   │   └── xcschemes
│   │   │   │       └── Runner.xcscheme
│   │   │   └── project.pbxproj
│   │   ├── Runner.xcworkspace
│   │   │   ├── xcshareddata
│   │   │   │   ├── IDEWorkspaceChecks.plist
│   │   │   │   └── WorkspaceSettings.xcsettings
│   │   │   └── contents.xcworkspacedata
│   │   ├── RunnerTests
│   │   │   └── RunnerTests.swift
│   │   └── .gitignore
│   ├── lib
│   │   ├── models
│   │   │   └── gymkhana.dart
│   │   ├── services
│   │   │   └── api.dart
│   │   ├── config.dart
│   │   └── main.dart
│   ├── linux
│   │   ├── flutter
│   │   │   ├── CMakeLists.txt
│   │   │   ├── generated_plugin_registrant.cc
│   │   │   ├── generated_plugin_registrant.h
│   │   │   └── generated_plugins.cmake
│   │   ├── runner
│   │   │   ├── CMakeLists.txt
│   │   │   ├── main.cc
│   │   │   ├── my_application.cc
│   │   │   └── my_application.h
│   │   ├── .gitignore
│   │   └── CMakeLists.txt
│   ├── macos
│   │   ├── Flutter
│   │   │   ├── Flutter-Debug.xcconfig
│   │   │   ├── Flutter-Release.xcconfig
│   │   │   └── GeneratedPluginRegistrant.swift
│   │   ├── Runner
│   │   │   ├── Assets.xcassets
│   │   │   │   └── AppIcon.appiconset
│   │   │   │       ├── app_icon_1024.png
│   │   │   │       ├── app_icon_128.png
│   │   │   │       ├── app_icon_16.png
│   │   │   │       ├── app_icon_256.png
│   │   │   │       ├── app_icon_32.png
│   │   │   │       ├── app_icon_512.png
│   │   │   │       ├── app_icon_64.png
│   │   │   │       └── Contents.json
│   │   │   ├── Base.lproj
│   │   │   │   └── MainMenu.xib
│   │   │   ├── Configs
│   │   │   │   ├── AppInfo.xcconfig
│   │   │   │   ├── Debug.xcconfig
│   │   │   │   ├── Release.xcconfig
│   │   │   │   └── Warnings.xcconfig
│   │   │   ├── AppDelegate.swift
│   │   │   ├── DebugProfile.entitlements
│   │   │   ├── Info.plist
│   │   │   ├── MainFlutterWindow.swift
│   │   │   └── Release.entitlements
│   │   ├── Runner.xcodeproj
│   │   │   ├── project.xcworkspace
│   │   │   │   └── xcshareddata
│   │   │   │       └── IDEWorkspaceChecks.plist
│   │   │   ├── xcshareddata
│   │   │   │   └── xcschemes
│   │   │   │       └── Runner.xcscheme
│   │   │   └── project.pbxproj
│   │   ├── Runner.xcworkspace
│   │   │   ├── xcshareddata
│   │   │   │   └── IDEWorkspaceChecks.plist
│   │   │   └── contents.xcworkspacedata
│   │   ├── RunnerTests
│   │   │   └── RunnerTests.swift
│   │   └── .gitignore
│   ├── test
│   │   └── widget_test.dart
│   ├── web
│   │   ├── icons
│   │   │   ├── Icon-192.png
│   │   │   ├── Icon-512.png
│   │   │   ├── Icon-maskable-192.png
│   │   │   └── Icon-maskable-512.png
│   │   ├── favicon.png
│   │   ├── index.html
│   │   └── manifest.json
│   ├── windows
│   │   ├── flutter
│   │   │   ├── CMakeLists.txt
│   │   │   ├── generated_plugin_registrant.cc
│   │   │   ├── generated_plugin_registrant.h
│   │   │   └── generated_plugins.cmake
│   │   ├── runner
│   │   │   ├── resources
│   │   │   │   └── app_icon.ico
│   │   │   ├── CMakeLists.txt
│   │   │   ├── flutter_window.cpp
│   │   │   ├── flutter_window.h
│   │   │   ├── main.cpp
│   │   │   ├── resource.h
│   │   │   ├── runner.exe.manifest
│   │   │   ├── Runner.rc
│   │   │   ├── utils.cpp
│   │   │   ├── utils.h
│   │   │   ├── win32_window.cpp
│   │   │   └── win32_window.h
│   │   ├── .gitignore
│   │   └── CMakeLists.txt
│   ├── .gitignore
│   ├── analysis_options.yaml
│   ├── pubspec.lock
│   ├── pubspec.yaml
│   └── README.md
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

**¡Gracias por usar KhanaGO Stack Playground!**

  <img src="Multimedia/TFG,%20Logo%20KhanaGO.png" alt="Logo KhanaGO" width="280">

