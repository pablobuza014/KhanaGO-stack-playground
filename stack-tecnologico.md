<div style="text-align: justify;">

# 1. *Stack* Tecnológico

## Tabla de Contenidos

- [1. *Stack* Tecnológico](#1-stack-tecnológico)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [1.1. Introducción y objetivo](#11-introducción-y-objetivo)
    - [1.1.1. Combinaciones probadas](#111-combinaciones-probadas)
  - [1.2. Arquitectura y estructura del repositorio](#12-arquitectura-y-estructura-del-repositorio)
    - [1.2.1. Principio de desacoplamiento](#121-principio-de-desacoplamiento)
    - [1.2.2. Estructura del repositorio](#122-estructura-del-repositorio)
    - [1.2.3. Configuración de puertos](#123-configuración-de-puertos)
    - [1.2.4. Modelo de dominio](#124-modelo-de-dominio)
    - [1.2.5. *Endpoints* REST](#125-endpoints-rest)
  - [1.3. Lenguajes de programación utilizados](#13-lenguajes-de-programación-utilizados)
    - [1.3.1. Python](#131-python)
    - [1.3.2. Java](#132-java)
    - [1.3.3. TypeScript / JavaScript](#133-typescript--javascript)
    - [1.3.4. Dart](#134-dart)
  - [1.4. Análisis detallado de los *Backends*](#14-análisis-detallado-de-los-backends)
    - [1.4.1. FastAPI (Puerto 8001)](#141-fastapi-puerto-8001)
    - [1.4.2. Django + DRF (Puerto 8002)](#142-django--drf-puerto-8002)
    - [1.4.3. Spring Boot (Puerto 8003)](#143-spring-boot-puerto-8003)
  - [1.5. Análisis detallado de los *Frontends*](#15-análisis-detallado-de-los-frontends)
    - [1.5.1. Next.js + TypeScript (Puerto 3000)](#151-nextjs--typescript-puerto-3000)
    - [1.5.2. Flutter (Puerto dinámico)](#152-flutter-puerto-dinámico)
    - [1.5.3. React Native + Expo (Puerto 8081)](#153-react-native--expo-puerto-8081)
  - [1.6. Vídeo de demostración](#16-vídeo-de-demostración)
  - [1.7. Decisión final de *stack* para KhanaGO](#17-decisión-final-de-stack-para-khanago)
    - [1.7.1. Justificación del *backend*: FastAPI](#171-justificación-del-backend-fastapi)
    - [1.7.2. Justificación del *frontend*: React Native (Expo)](#172-justificación-del-frontend-react-native-expo)
    - [1.7.3. Opciones descartadas](#173-opciones-descartadas)

---

## 1.1. Introducción y objetivo

&emsp;KhanaGO es una plataforma digital inteligente para el diseño, gestión y participación en gymkhanas. Antes de iniciar el desarrollo del producto, se planteó la necesidad de evaluar y comparar diferentes *stacks* tecnológicos para elegir la combinación óptima de *backend* y *frontend* que mejor se pudiese adaptar a los requisitos del proyecto.

&emsp;Por este motivo, se creó un proyecto en Visual Studio llamado "KhanaGO-stack-playground", un repositorio *monorepo* que implementa la misma funcionalidad (gestión CRUD básica de gymkhanas) con distintas tecnologías, manteniendo una API REST coherente para poder alternar *backends* y comparar *stacks* de forma objetiva.

&emsp;La clave del enfoque es el desacoplamiento: los *frontends* apuntan al *backend* activo mediante su URL base y consumen respuestas JSON con una estructura ligeramente compartida, lo que permite evaluar interoperabilidad, productividad y comportamiento técnico bajo un caso de uso común.

&emsp;Como evidencia empírica del proceso de comparación, se ha elaborado un vídeo de demostración en el que se muestran las pruebas realizadas con las distintas combinaciones *backend*-*frontend* y las verificaciones correspondientes. El material puede consultarse en el siguiente [enlace](https://drive.google.com/file/d/1BE53_v65oD-9bClC7isq_SHydvh8TUja/view?usp=drive_link).


### 1.1.1. Combinaciones probadas

&emsp;Las combinaciones probadas se recogen en la siguiente tabla:

<div align="center">

| | **Next.js (*Web*)** | **Flutter (Multiplataforma)** | **React Native (Expo)** |
|:---|:---:|:---:|:---:|
| **FastAPI (Puerto 8001)** | X | X | X |
| **Django (Puerto 8002)** | X | X | X |
| **Spring Boot (Puerto 8003)** | X | X | X |

<em>Tabla 1: Combinaciones probadas en el <em>stack</em> tecnológico</em>

</div>

&emsp;Las nueve combinaciones fueron probadas sistemáticamente, verificando operaciones CRUD completas en cada par *backend*-*frontend*, tal y como aparece y se documenta en el vídeo de demostración del proyecto "KhanaGO-stack-playground".


## 1.2. Arquitectura y estructura del repositorio

### 1.2.1. Principio de desacoplamiento

&emsp;El repositorio "KhanaGO-stack-playground" está diseñado para comparar *stacks* de forma objetiva manteniendo separadas la capa de presentación (*frontend*) y la capa de servicio (*backend*). La comunicación entre ambas capas se realiza únicamente mediante una API REST sobre HTTP, intercambiando datos en JSON, y el caso de uso implementado es un CRUD básico y completo de gymkhanas.

&emsp;En la práctica, el desacoplamiento se consigue porque cada *frontend* solo necesita apuntar a la URL base del *backend* activo (cambiando el puerto) para funcionar con otro servidor. En el README del repositorio se muestra explícitamente este cambio de *backend* desde el *frontend* (por ejemplo, en Next.js mediante variables de entorno) usando los puertos 8001 (FastAPI), 8002 (Django) y 8003 (Spring Boot).

&emsp;Este enfoque permite alternar *backends* sin tocar la lógica del *frontend* más allá de la configuración de la URL, facilitando comparar interoperabilidad, facilidad de desarrollo y comportamiento del sistema con el mismo dominio funcional. Además, el repositorio incluye CORS configurado en los tres *backends* y validación de datos en los tres *backends* ("Pydantic" en FastAPI, *serializers* en Django y validación manual con "ResponseStatusException" en SpringBoot), precisamente para que el intercambio *frontend*-*backend* sea consistente durante las pruebas.


### 1.2.2. Estructura del repositorio

&emsp;El repositorio o proyecto se organiza como un *monorepo* donde cada directorio raíz corresponde a una implementación independiente. No existen dependencias cruzadas entre ellos, lo que refuerza el principio de desacoplamiento mencionado con anterioridad.

```
KhanaGO-stack-playground/
|__ Django_BACKEND/
|__ FastAPI_BACKEND/
|__ SpringBoot_BACKEND/
|__ Next_FRONTEND/
|__ Flutter_FRONTEND/
|__ ReactNative_FRONTEND/
|__ Multimedia/
|__ notas.txt
|__ README.md
```


### 1.2.3. Configuración de puertos

&emsp;Para permitir la ejecución concurrente de los distintos *stacks* tecnológicos y facilitar la conmutación entre *backends* durante las pruebas del *playground*, se estableció una asignación diferenciada de puertos para cada servicio:

<div align="center">

| Componente | Lenguaje Base | Entorno principal | Puerto |
|:---|:---|:---|:---:|
| FastAPI *Backend* | Python | FastAPI (ASGI) + Uvicorn | 8001 |
| Django *Backend* | Python | Django + Django Rest Framework | 8002 |
| Spring Boot *Backend* | Java | Spring Boot (Spring *Web*) | 8003 |
| Next.js *Frontend* | TypeScript | Next.js (sobre React) | 3000 |
| React Native *Frontend* | JavaScript | React Native + Expo | 8081 |
| Flutter *Frontend* | Dart | Flutter SDK | Dinámico |

<em>Tabla 2: Configuración de puertos en el <em>stack</em> tecnológico</em>

</div>


### 1.2.4. Modelo de dominio

&emsp;La entidad principal del *playground* es "Gymkhana". Los tres *backends* modelan la misma entidad, pero la representación JSON que devuelven no es exactamente idéntica en todos los casos.

&emsp;Los campos comunes a los tres *backends* (contrato mínimo de facto) son los siguientes:

```json
{
  "id":          0,
  "name":        "string",
  "description": "string | null",
  "location":    "string | null",
  "created_at":  "string (ISO 8601)",
  "updated_at":  "string (ISO 8601)"
}
```

, donde:

- **"id"** representa el identificador numérico de la gymkhana (generado por el servidor).
- **"name"** simboliza el nombre de la gymkhana a crear, el cual es obligatorio, único y debe tener longitud no superior a 120 caracteres.
- **"description"** refleja la descripción de la gymkhana y es un atributo opcional.
- **"location"** muestra la ubicación de la gymkhana y es un atributo opcional.
- **"created_at"** representa la fecha de creación, generada automáticamente por el servidor. En FastAPI se gestiona con "server_default=func.now()", en Django con "auto_now_add=True" y en Spring Boot con "Instant.now().toString()".
- **"updated_at"** representa la fecha de última modificación. En FastAPI se gestiona con "onupdate=func.now()", en Django con "auto_now=True" y en Spring Boot con "Instant.now().toString()".

> **OBSERVACIÓN:** Los *frontends* tratan "created_at" y "updated_at" como campos opcionales por diseño defensivo, de modo que la interfaz seguiría funcionando incluso si un *backend* no los incluyese.


### 1.2.5. *Endpoints* REST

&emsp;Los tres *backends* comparten las rutas base ("/gymkhanas/" y "/gymkhanas/{id}/") con *trailing slash* (barra diagonal situada al final de una URL) como convención, pero no todos implementan las mismas operaciones ni devuelven los mismos códigos HTTP.

&emsp;A continuación, observaremos mediante una tabla las operaciones implementadas por cada *backend*:

<div align="center">

| Operación | Método | Ruta | FastAPI | Django (DRF) | Spring Boot |
|:---|:---:|:---|:---:|:---:|:---:|
| Listar | GET | /gymkhanas/ | 200 | 200 | 200 |
| Crear | POST | /gymkhanas/ | 201 / 409 | 201 / 400 | 201 / 409 |
| Detalle | GET | /gymkhanas/{id}/ | 200 / 404 | 200 / 404 | 200 / 404 |
| Actualizar (completo) | PUT | /gymkhanas/{id}/ | 200 / 404 / 409 | 200 / 400 / 404 | 200 / 400 / 404 / 409 |
| Actualizar (parcial) | PATCH | /gymkhanas/{id}/ | - | 200 / 400 / 404 | - |
| Eliminar | DELETE | /gymkhanas/{id}/ | 204 / 404 | 204 / 404 | 204 / 404 |

<em>Tabla 3: Operaciones implementadas por cada <em>backend</em> en el <em>stack</em> tecnológico</em>

</div>

, donde:

<div align="center">

| Código HTTP | Denominación |
|:---:|:---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |

<em>Tabla 4: Mapeo de códigos HTTP a su denominación estándar</em>

</div>

> **OBSERVACIÓN:** DRF expone "PATCH" de forma nativa mediante "ModelViewSet" (acción "partial_update"). En FastAPI y Spring Boot, la actualización parcial no se genera automáticamente y requiere una implementación explícita del *endpoint* y su lógica de actualización. En consecuencia, en estos dos últimos, no ha sido implementado.

&emsp;A posteriori, se mostrarán vía una tabla las operaciones consumidas por cada *frontend*:

<div align="center">

| Operación | Next.js (api.ts) | Flutter (api.dart) | React Native (client.js) |
|:---|:---:|:---:|:---:|
| List | SÍ | SÍ | SÍ |
| Get | NO | NO | SÓLO DEFINIDO |
| Create | SÍ | SÍ | SÍ |
| Update | SÍ | SÍ | SÍ |
| Delete | SÍ | SÍ | SÍ |

<em>Tabla 5: Operaciones consumidas por cada <em>frontend</em> en el <em>stack</em> tecnológico</em>

</div>

> **OBSERVACIÓN:** React Native es el único *frontend* que define get(id) en su cliente API, aunque la pantalla principal (GymkhanasScreen.js) sólo utiliza "list" para obtener datos, por lo que en la práctica esta ruta no se invoca durante el flujo CRUD normal. Esto se debió a una intención probatoria de diseño. Además, nótese que los clientes HTTP de los *frontends* están diseñados para tolerar las diferencias de códigos entre *backends*.


## 1.3. Lenguajes de programación utilizados

&emsp;El *playground* emplea cuatro lenguajes de programación distintos, lo que permite una comparativa directa de su ergonomía, ecosistema y rendimiento en el contexto de desarrollo *web* y móvil.


### 1.3.1. Python

&emsp;Python es un lenguaje de programación interpretado, de alto nivel y tipado dinámico, creado por Guido van Rossum en 1991. Su filosofía enfatiza la legibilidad del código y la productividad del desarrollador. En este *playground* se utiliza en dos *backends*: FastAPI y Django.

&emsp;Características destacadas: sintaxis limpia y expresiva, enorme ecosistema de paquetes (PyPI), comunidad masiva, excelente para prototipado rápido y desarrollo ágil. Soporta tanto programación orientada a objetos como funcional. La versión 3.10+ incorpora *pattern matching* y mejoras significativas en *type hints*.

&emsp;En el *playground*: FastAPI aprovecha las *type hints* de Python junto con Pydantic para validación automática de datos, mientras que Django utiliza su ORM propio con un enfoque más clásico y estructurado.


### 1.3.2. Java

&emsp;Java es un lenguaje compilado, fuertemente tipado y orientado a objetos, desarrollado originalmente por Sun Microsystems (ahora Oracle) en 1995. Es uno de los lenguajes más utilizados en entornos *enterprise* y de gran escala. En este *playground* se utiliza Java 21 (LTS) con Spring Boot.

&emsp;Características destacadas: compilación estática que detecta errores en tiempo de compilación, excelente rendimiento gracias a la JVM (Java Virtual Machine), recolector de basura maduro, y un ecosistema *enterprise* consolidado con décadas de evolución.

&emsp;En el *playground*: Spring Boot proporciona convenciones *enterprise* con autoconfiguración, inyección de dependencias y un servidor HTTP embebido (Tomcat), aunque resulta más verboso que los *backends* Python para un CRUD simple.


### 1.3.3. TypeScript / JavaScript

&emsp;JavaScript es el lenguaje nativo de la *web*, ejecutado en navegadores y en el servidor vía Node.js. TypeScript es un *superset* de JavaScript desarrollado por Microsoft que añade tipado estático opcional. En este *playground* se utiliza en dos *frontends*: Next.js (TypeScript) y React Native (JavaScript con TypeScript disponible).

&emsp;Características destacadas: ubicuidad en el desarrollo *web*, programación asíncrona nativa (Promises, *async/await*), ecosistema "npm" con más de 2 millones de paquetes, y la posibilidad de compartir código entre *frontend web* y móvil gracias a React y React Native.

&emsp;En el *playground*: Next.js aprovecha TypeScript para tipado seguro en toda la capa *web* (el componente principal usa "use client" renderizado en cliente), mientras que React Native con Expo utiliza JavaScript para desarrollo móvil multiplataforma con soporte *web* vía *react-native-web*.


### 1.3.4. Dart

&emsp;Dart es un lenguaje desarrollado por Google, diseñado específicamente para construir interfaces de usuario multiplataforma. Es el lenguaje principal del *framework* Flutter. Soporta tanto compilación AOT (*Ahead-of-Time*) para producción como JIT (*Just-in-Time*) para desarrollo con *hot reload*.

&emsp;Características destacadas: tipado fuerte, *null safety* integrado, compilación nativa real para múltiples plataformas (iOS, Android, *Web*, Windows, macOS, Linux), y un modelo de *widgets* declarativo que permite crear interfaces complejas con un solo código base.

&emsp;En el *playground*: Flutter utiliza Dart con Material Design 3 para crear una interfaz CRUD que funciona en *web*, Android e iOS, entre otros. La configuración de plataforma en "config.dart" demuestra la detección en tiempo de ejecución ("kIsWeb", "Platform.isAndroid") para adaptar la URL del *backend* según el entorno.


## 1.4. Análisis detallado de los *Backends*

### 1.4.1. FastAPI (Puerto 8001)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | Python |
| *Framework* | FastAPI + Uvicorn (ASGI) |
| ORM / Validación | SQLAlchemy 2.0 + Pydantic |
| Base de datos | SQLite ("dev.db") configurable vía "DATABASE_URL" |
| Documentación de la API | Swagger UI automático ("/docs") |
| CORS | Permisivo (`allow_origins=["*"]`) |

</div>

&emsp;Toda la implementación reside en un único fichero "main.py": modelo ORM (SQLAlchemy 2.0 con "Mapped" *type hints*), esquemas "Pydantic" de entrada/salida, inyección de dependencias para sesiones de BD, y los cinco *endpoints* REST. El listado soporta paginación ("skip / limit") y búsqueda textual ("q") con "ILIKE . Los errores HTTP se manejan explícitamente con "HTTPException".


### 1.4.2. Django + DRF (Puerto 8002)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | Python |
| *Framework* | Django 5.2.7 + Django REST Framework 3.16.1 |
| Base de datos | SQLite ("db.sqlite3") |
| Documentación de la API | Interfaz navegable de DRF |
| CORS | django-cors-headers 4.9.0 (`CORS_ALLOW_ALL_ORIGINS = True`) |

</div>

&emsp;Django es el *backend* más conciso gracias a la abstracción de DRF: el modelo ORM define la entidad con "unique = True" en "name" y *timestamps* automáticos ("auto_now_add" / "auto_now" ), el "GymkhanaSerializer" expone los seis campos, y el "ModelViewSet" genera automáticamente todas las acciones CRUD (incluido "PATCH"). El "DefaultRouter" crea las rutas RESTful sin configuración manual. La validación y los códigos HTTP los gestiona DRF internamente (errores de validación como 400). REST Framework se configura sin autenticación ni permisos (acceso público).


### 1.4.3. Spring Boot (Puerto 8003)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | Java 21 (LTS) |
| *Framework* | Spring Boot 3.5.6 + Spring MVC |
| Herramienta de construcción | Apache Maven |
| Persistencia | En memoria ("LinkedHashMap"), sin base de datos |
| Documentación de la API | Swagger UI (springdoc-openapi 2.6.0) |
| CORS | Restringido a localhost:* y 127.0.0.1:* |

</div>

&emsp;El controlador REST ("GymkhanaController") almacena los datos en un "LinkedHashMap" en memoria con un contador secuencial para IDs. A diferencia de los *backends* Python, no utiliza ORM ni base de datos. Los *timestamps* se generan con "Instant.now().toString()" (ISO 8601). La validación se realiza manualmente mediante "ResponseStatusException". El constructor crea un registro semilla inicial. La ruta raíz redirige a Swagger UI.


## 1.5. Análisis detallado de los *Frontends*

### 1.5.1. Next.js + TypeScript (Puerto 3000)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | TypeScript ^5.5.4 |
| *Framework* | Next.js 14.2.5 (App Router) |
| Librería UI | React 18.3.1 |
| Estilos | Tailwind CSS ^3.4.7, estilos *inline* con CSS *custom* |
| Plataformas | *Web* |

</div>

&emsp;El cliente API ("src/lib/api.ts") utiliza *fetch* con caché "no-store" . La URL base se configura mediante "NEXT_PUBLIC_API_BASE". El método "list()" soporta tanto *arrays* directos como respuestas paginadas ("{results:[]}") para compatibilidad con DRF. El componente principal es un componente cliente ("use client") con formulario dual creación/edición.


### 1.5.2. Flutter (Puerto dinámico)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | Dart |
| *Framework* | Flutter SDK >= 3.5.0 y < 4.0.0 |
| HTTP | package:http ^1.2.2 |
| Diseño | Material Design 3 |
| Plataformas | *Web*, Android, iOS, Windows, macOS, Linux |

</div>

&emsp;La configuración de URL ("lib/config.dart") implementa detección de plataforma: para *web* usa *localhost*; para el emulador Android usa 10.0.2.2 (IP especial que mapea al *host*). El puerto se cambia manualmente para conmutar entre *backends*. El modelo Gymkhana es una clase inmutable con *factory* "fromJson()". El cliente HTTP maneja múltiples códigos de respuesta.


### 1.5.3. React Native + Expo (Puerto 8081)

<div align="center">

| Propiedad | Valor |
|:---|:---|
| Lenguaje | JavaScript |
| *Framework* | React Native 0.75.4 + Expo SDK ^54.0.0 |
| Navegación | React Navigation 6.x (*native-stack*) |
| HTTP | Fetch API nativa |
| Plataformas | iOS, Android, *Web* ("react-native-web") |

</div>

&emsp;Implementa conmutación de *backends* mediante "app.config.js", que mapea tres archivos de entorno (".env.django", ".env.fastapi", ".env.springboot") a sus respectivas URLs, accesibles en *runtime* vía "expo-constants". El método "list()" soporta *arrays* directos y respuestas con clave "results" (compatibilidad DRF). La pantalla utiliza componentes nativos de React Native con iconos "MaterialIcons".


## 1.6. Vídeo de demostración

&emsp;Con el fin de documentar el funcionamiento del *stack* tecnológico desarrollado, se ha elaborado un vídeo de demostración. En dicho vídeo se presentan: (i) la documentación interactiva de los servicios API (por ejemplo, Swagger), (ii) la ejecución, desde la interfaz de usuario, de las operaciones CRUD sobre gymkhanas (creación, listado, actualización y eliminación), y (iii) la verificación de estas operaciones sobre las distintas implementaciones del *backend* disponibles en el entorno de pruebas. Asimismo, se describe el mecanismo empleado para conmutar la URL de conexión, permitiendo reutilizar la misma interfaz contra diferentes servidores para fines comparativos. Ç

&emsp;El material en cuestión puede consultarse pulsando sobre el siguiente [enlace](https://drive.google.com/file/d/1BE53_v65oD-9bClC7isq_SHydvh8TUja/view?usp=drive_link).

&emsp;En el vídeo de demostración se presenta, de forma continua, el entorno de trabajo y ejecución del *stack playground* en Visual Studio Code, mostrando la estructura del proyecto y varias terminales activas en paralelo. A partir de ahí, se evidencia que los tres *backends* (FastAPI, Django + DRF y Spring Boot) pueden arrancarse localmente en puertos distintos y que los tres *frontends* (Next.js, Flutter y React Native con Expo) se ejecutan simultáneamente, quedando listos para consumir el *backend* seleccionado mediante una configuración explícita (principalmente a través de variables de entorno y ficheros de configuración). Esta apertura sirve como prueba inicial de reproducibilidad: el vídeo no parte de resultados "ya preparados", sino de un entorno real de desarrollo con procesos activos y configuración visible.

&emsp;A continuación, se valida el funcionamiento CRUD completo desde los *frontends* contra un mismo *backend*, comprobando que la creación, edición y eliminación de registros se reflejan correctamente en la interfaz. Se observa que, cuando dos o más *frontends* apuntan al mismo *backend*, comparten coherentemente el conjunto de datos: una gymkhana creada desde un *frontend* aparece en los otros, y una actualización realizada desde React Native o Flutter se visualiza también desde Next.js, confirmando que no se trata de estados locales aislados sino de persistencia y acceso centralizados a través del *backend* activo. Este comportamiento demuestra la interoperabilidad real de la capa cliente con independencia de la tecnología del *frontend*.

&emsp;El vídeo también incluye verificaciones directas de los *backends* mediante sus interfaces de documentación y/o *endpoints* HTTP, para contrastar que la API responde con la estructura esperada y que las operaciones realizadas desde los *frontends* se corresponden con cambios reales en el servidor. En particular, se muestra la documentación autogenerada en FastAPI, la API navegable de Django REST Framework y la disponibilidad de documentación OpenAPI en Spring Boot, reforzando el carácter verificable del sistema y la trazabilidad entre acciones en la UI y respuestas del servidor.

&emsp;Posteriormente, se demuestra la conmutación entre *backends* modificando la configuración del *frontend* (por ejemplo, la URL base del API), y se comprueba que el conjunto de datos cambia al cambiar de *backend*, lo cual es consistente con que cada implementación mantiene su propia persistencia (p. ej., SQLite en los *backends* Python y almacenamiento en memoria en Spring Boot). Esta parte resulta clave para el objetivo experimental del trabajo: la misma capa de presentación puede operar sobre distintas implementaciones del servicio, y las diferencias de persistencia y estado quedan claramente reflejadas en los resultados observados.

&emsp;Finalmente, el vídeo cierra confirmando que se han probado las nueve combinaciones posibles de la matriz 3×3 (tres *backends* por tres *frontends*). En conjunto, la demostración respalda que el proyecto es reproducible, que el contrato de comunicación es suficientemente estable para soportar múltiples tecnologías, y que la arquitectura permite comparar implementaciones de forma controlada sin alterar la lógica funcional del cliente. Además, para concluir, se establece la decisión de diseño escogida para producir KhanaGO, junto a su justificación.


## 1.7. Decisión final de *stack* para KhanaGO

&emsp;Tras la evaluación práctica de las nueve combinaciones y considerando los requisitos de KhanaGO como aplicación de creación y participación en gymkhanas, el *stack* seleccionado para el desarrollo definitivo es:

<div align="center">

| Capa | Tecnología |
|:---|:---|
| *Backend* | FastAPI + Pydantic |
| *Frontend* | React Native (Expo) + TypeScript |
| MVP *Web* | Vite + React + TypeScript |
| Base de datos | PostgreSQL (Supabase) |
| Documentación de la API | Swagger UI (generación automática de FastAPI) |

</div>


### 1.7.1. Justificación del *backend*: FastAPI

&emsp;FastAPI ofrece un flujo de desarrollo especialmente ágil para el desarrollo de KhanaGO. La combinación de Python, *type hints* y "Pydantic" permite definir *endpoints* de forma concisa, manteniendo validación y estructura desde versiones tempranas del *backend* y facilitando la evolución del contrato de datos.

&emsp;El uso de "Pydantic" aporta tipado y validación automática de los datos de entrada y salida, reduciendo errores derivados de formatos inconsistentes y reforzando la coherencia entre el modelo interno y la interfaz expuesta por la API. Esta aproximación mejora la mantenibilidad y simplifica la detección de fallos durante la integración con el cliente.

&emsp;FastAPI genera documentación interactiva basada en OpenAPI (por ejemplo, "Swagger UI" y "ReDoc"), lo que facilita la inspección y prueba de *endpoints*, así como la verificación de *payloads* durante el desarrollo. Esta capacidad resulta especialmente útil en escenarios de comparación de implementaciones y en tareas de depuración.

&emsp;En KhanaGO, el *backend* requiere exponer listados consultables (por ejemplo, gymkhanas) y soportar parámetros de consulta. En FastAPI, estas capacidades se implementan de forma directa mediante parámetros de ruta y consulta, permitiendo definir criterios de búsqueda, filtrado y, cuando proceda, paginación de manera controlada desde la propia lógica de aplicación.

&emsp;La utilización de PostgreSQL gestionado mediante Supabase permite disponer de una base de datos operativa sin despliegue de infraestructura propia, proporcionando además herramientas de administración y servicios complementarios (por ejemplo, autenticación y almacenamiento) que pueden integrarse según las necesidades del proyecto. Esto reduce carga operativa y concentra el esfuerzo en el diseño y desarrollo del sistema.

&emsp;Frente a alternativas como Firebase, Supabase se alinea mejor con la naturaleza relacional de los datos de KhanaGO (usuarios, gymkhanas, estaciones, sesiones o partidas de gymkhana, equipos, invitaciones, comunidades, resultados y métricas de progresión como nivel de experiencia, racha diaria y logros, etcétera), al basarse en PostgreSQL y permitir consultas SQL expresivas y consistentes. Adicionalmente, incorpora control de acceso fino mediante Row-Level Security (RLS), facilita la portabilidad de los datos y ofrece capacidades de comunicación en tiempo real integrables con componentes sociales y multijugador ya contemplados en la plataforma (por ejemplo, chat en partidas de gymkhana, chat comunitario y actualización del estado de sesión), manteniendo el modelo de datos centralizado en una base relacional.

&emsp;Dado que KhanaGO se concibe como una plataforma multijugador y *online*, el *backend* debe contemplar escenarios de concurrencia, sincronización de estado y comunicación cliente-servidor durante la ejecución de partidas. En este contexto, el soporte asíncrono de FastAPI y su compatibilidad con mecanismos de comunicación en tiempo real (por ejemplo, *WebSockets*) proporcionan una base técnica adecuada para habilitar, cuando proceda, funcionalidades como chat, notificaciones o seguimiento de progreso en sesión.


### 1.7.2. Justificación del *frontend*: React Native (Expo)

&emsp;KhanaGO se plantea como una plataforma con múltiples modalidades de uso, incluyendo experiencias que pueden ejecutarse en exterior y con geolocalización, así como otras que no requieren desplazamiento. En consecuencia, resulta prioritario disponer de un cliente móvil robusto, dado que el teléfono móvil constituye el dispositivo principal de participación y ejecución en una parte significativa de los escenarios de uso.

&emsp;Expo se selecciona por reducir fricción en el ciclo de desarrollo y pruebas en dispositivo. En particular, permite validar de forma temprana la presentación real de la interfaz (disposición, tamaños, escalado, navegación, rendimiento y comportamiento en pantalla), disminuyendo el riesgo de detectar problemas de diseño únicamente en fases tardías de empaquetado y despliegue.

&emsp;La adopción de TypeScript introduce tipado estático y contribuye a la robustez del código, reduciendo errores comunes en aplicaciones con múltiples pantallas, estados y flujos. Esta elección facilita el mantenimiento y la evolución del cliente conforme aumenta el volumen funcional, y preserva coherencia tecnológica ante una eventual extensión *web* mediante *frameworks* como Next.js. En el alcance actual, se contempla a medio plazo una plataforma *web* de carácter informativo, orientada a la presentación del proyecto y al acceso al enlace de descarga de KhanaGO, dejando para fases posteriores el desarrollo de una aplicación *web* funcional equivalente.

&emsp;El ecosistema de Node.js y el gestor de paquetes "npm" permiten integrar bibliotecas consolidadas para navegación, gestión de estado y componentes de interfaz, reduciendo el esfuerzo de implementación de funcionalidad transversal y favoreciendo un desarrollo consistente dentro del mismo entorno TypeScript.

&emsp;Adicionalmente, el uso de *react-native-web* permite plantear una versión *web* con reutilización parcial de componentes cuando resulte pertinente, manteniendo la alineación tecnológica entre plataformas y reduciendo la duplicidad de implementación.

> **OBSERVACIÓN:** En una fase inicial de prototipado centrada exclusivamente en la interfaz (*frontend-only*), se utilizó Vite + React como entorno de desarrollo *web*, dada su ligereza y rapidez de ejecución, lo que permitió iterar sobre pantallas sin dependencia de un *backend* operativo.


### 1.7.3. Opciones descartadas

&emsp;Django + DRF se consideró como alternativa, pero se descartó atendiendo principalmente al coste de puesta en marcha observado en el contexto del proyecto (instalación, configuración, dependencias, migraciones y conexión con base de datos), lo que introducía fricción adicional para el alcance planteado. No obstante, en términos de código final, DRF ofrece un nivel elevado de concisión para CRUD, ya que un "ModelViewSet" puede exponer operaciones completas con un volumen reducido de código; la decisión, por tanto, se fundamenta ligeramente en el esfuerzo inicial de configuración y no tanto en la expresividad del código resultante.

&emsp;Spring Boot se evaluó como opción sólida, pero se descartó por su mayor verbosidad y por el coste de implementación asociado en relación con el alcance comparativo. En el entorno de pruebas considerado, este enfoque resultaba menos eficiente para iterar y mantener paridad funcional durante la comparación de *backends*.

&emsp;Next.js se descartó como opción principal por su orientación *web*. Sin embargo, se considera una alternativa razonable como complemento futuro, tanto para una versión *web* funcional como para una *web* informativa (presentación de la plataforma y acceso a descarga), manteniendo además coherencia tecnológica mediante TypeScript. En el estado actual, se prioriza un *stack* centrado en cliente móvil, dejando la parte *web* como extensión posterior, tal y como comentamos en el subapartado anterior.

&emsp;Finalmente, Flutter se descartó debido a que implica desarrollar sobre Dart, un lenguaje que no había utilizado previamente. Esta elección suponía un esfuerzo de aprendizaje adicional y un riesgo temporal significativo, sin una ventaja determinante frente a otras adopciones de ecosistema.

</div>


<img src="Multimedia/TFG,%20Logo%20KhanaGO.png" alt="Logo KhanaGO" width="280">

**¡Gracias por su atención!**
