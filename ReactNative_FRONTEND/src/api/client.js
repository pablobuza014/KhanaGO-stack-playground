// src/api/client.js

const HOST = "http://localhost:8003";  // CAMBIA AQUÍ el puerto si se quiere probar FastAPI (8001),  Django (8002) o SpringBoot (8003)

async function httpJSON(path, { method = "GET", body } = {}) {
  const url = `${HOST}${path}`;
  const res = await fetch(url, {
    method,
    headers: {"Content-Type": "application/json"},
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }

  return res.json();
}

export const GymkhanaAPI = {
  list: async () => {
    const d = await httpJSON("/gymkhanas/");
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.results)) return d.results;
    return [];
  },
  get: (id) => httpJSON(`/gymkhanas/${id}/`),
  create: (p) => httpJSON("/gymkhanas/", { method: "POST", body: p }),
  update: (id, p) => httpJSON(`/gymkhanas/${id}/`, { method: "PUT", body: p }),
  delete: (id) => httpJSON(`/gymkhanas/${id}/`, { method: "DELETE"}),
};