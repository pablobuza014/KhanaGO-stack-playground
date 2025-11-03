/* src/lib/api.ts */

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8003"; // CAMBIA AQUÍ el puerto si se quiere probar FastAPI (8001),  Django (8002) o SpringBoot (8003)

export type Gymkhana = {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  created_at?: string;
  updated_at?: string;
};

// JSON CREATION
async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `${res.status} ${res.statusText}`);
  }

  if (res.status === 204) {
    return null as T;
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return null as T;
  }

  return (await res.json()) as T;
}

export const GymkhanaAPI = {
  // READ
  list: async (): Promise<Gymkhana[]> => {
    const d = await json<any>("/gymkhanas/");
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.results)) return d.results;
    return [];
  },
  // CREATE
  create: (p: Partial<Gymkhana>) =>
    json<Gymkhana>("/gymkhanas/", {
      method: "POST",
      body: JSON.stringify(p),
    }),

  // UPDATE
  update: (id: number, p: Partial<Gymkhana>) =>
    json<Gymkhana>(`/gymkhanas/${id}/`, {
      method: "PUT",
      body: JSON.stringify(p),
    }),

  // DELETE
  delete: (id: number) =>
    json<void>(`/gymkhanas/${id}/`, {
      method: "DELETE",
    }),
};
