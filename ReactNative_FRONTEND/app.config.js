// app.config.js
const envFile = process.env.ENVFILE || ".env.springboot"; // CAMBIA AQUÍ según se desee arrancar Django ".env.django", FastAPI ".env.fastapi" o SpringBoot ".env.springboot"

const map = {
  ".env.django": {
    API_BASE_URL: "http://localhost:8002",
    API_BASE_PATH: "",
  },
  ".env.fastapi": {
    API_BASE_URL: "http://localhost:8001",
    API_BASE_PATH: "",
  },
  ".env.springboot": {
    API_BASE_URL: "http://localhost:8003",
    API_BASE_PATH: "",
  },
};

const selected = map[envFile];

export default {
  expo: {
    name: "KhanaGO",
    slug: "KhanaGO",
    entryPoint: "./index.js",
    extra: selected,
    platforms: ["ios", "android", "web"],
  },
};
