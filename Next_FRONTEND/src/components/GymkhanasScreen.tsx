"use client";

import React from "react";
import { GymkhanaAPI, Gymkhana } from "@/lib/api";

export default function GymkhanasScreen() {
  const [items, setItems] = React.useState<Gymkhana[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [editing, setEditing] = React.useState<Gymkhana | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await GymkhanaAPI.list();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setEditing(null);
  };

  const submit = async () => {
    const n = name.trim();
    const d = description.trim();
    const l = location.trim();
    if (!n) return;

    const payload = {
      name: n,
      description: d || null,
      location: l || null,
    };

    if (editing) {
      await GymkhanaAPI.update(editing.id, payload);
    } else {
      await GymkhanaAPI.create(payload);
    }
    resetForm();
    load();
  };

  const startEdit = (g: Gymkhana) => {
    setName(g.name || "");
    setDescription(g.description || "");
    setLocation(g.location || "");
    setEditing(g);
  };

  const deleteItem = async (g: Gymkhana) => {
    if (!window.confirm(`¿Eliminar "${g.name}"?`)) return;
    await GymkhanaAPI.delete(g.id);
    if (editing?.id === g.id) resetForm();
    load();
  };

  const isEditing = !!editing;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* APP BAR */}
      <header
        style={{
          height: 56,
          background: "var(--indigo)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <h1 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
          Gymkhanas
        </h1>
        <button
          onClick={load}
          title="Recargar"
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            width: 32,
            height: 32,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>
            refresh
          </span>
        </button>
      </header>

      {/* CONTENIDO */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 1rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* FORM */}
        <div style={{ padding: "1rem 0", gap: "0.75rem" }}>
          {/* Nombre */}
          <div style={{ marginBottom: 10 }}>
            <label className="block text-sm mb-1">Nombre *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="gym-input"
              placeholder="Nombre *"
            />
          </div>
          {/* Descripción */}
          <div style={{ marginBottom: 10 }}>
            <label className="block text-sm mb-1">Descripción</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="gym-input"
              placeholder="Descripción"
            />
          </div>
          {/* Ubicación */}
          <div style={{ marginBottom: 14 }}>
            <label className="block text-sm mb-1">Ubicación</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="gym-input"
              placeholder="Ubicación"
            />
          </div>

          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <button
              onClick={submit}
              className="gym-btn-primary"
              style={{ flex: 1 }}
            >
              {isEditing ? "Guardar cambios" : "Crear"}
            </button>
            {isEditing ? (
              <button
                onClick={resetForm}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--indigo)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            ) : null}
          </div>
        </div>

        {/* DIVIDER */}
        <hr style={{ border: 0, borderBottom: "1px solid var(--divider)" }} />

        {/* LISTA */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <p style={{ padding: "1rem 0" }}>Cargando...</p>
          ) : items.length === 0 ? (
            <p style={{ padding: "1rem 0" }}>Sin registros</p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {items.map((g) => (
                <li key={g.id} className="gym-item">
                  {/* id */}
                  <span style={{ minWidth: "3.5rem", fontSize: "0.85rem" }}>
                    #{g.id}
                  </span>

                  {/* contenido */}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{ margin: 0, fontWeight: 500, fontSize: "0.9rem" }}
                    >
                      {g.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        opacity: 0.65,
                      }}
                    >
                      {g.location || g.description || "—"}
                    </p>
                  </div>

                  {/* acciones */}
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      onClick={() => startEdit(g)}
                      className="gym-icon-btn edit"
                      title="Editar"
                    >
                      <span className="material-icons" style={{ fontSize: 18 }}>
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => deleteItem(g)}
                      className="gym-icon-btn delete"
                      title="Eliminar"
                    >
                      <span className="material-icons" style={{ fontSize: 18 }}>
                        delete
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
