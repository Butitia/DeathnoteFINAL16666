// frontend/src/pages/KillsList.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import NewKillForm from "../components/NewKillForm";

export default function KillsList() {
  const [kills, setKills]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKills = async () => {
    setLoading(true);
    try {
      const res = await api.get("/kills");
      setKills(res.data);
    } catch (err) {
      console.error("Error al cargar muertes:", err);
      alert("No se pudieron cargar las muertes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKills();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Muerte</h2>

      {/* Formulario para crear nueva muerte */}
      <NewKillForm onCreated={fetchKills} />

      {/* Estados de carga y lista */}
      {loading ? (
        <p className="text-center mt-4">Cargando muertes…</p>
      ) : kills.length === 0 ? (
        <p className="text-center mt-4">Aún no hay muertes registradas.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {kills.map(k => (
            <li key={k.id} className="bg-white p-4 rounded shadow">
              <p>
                <strong>Persona ID:</strong> {k.person_id}
              </p>
              <p>
                <strong>Causa:</strong> {k.description}
              </p>
              {/* Aquí simplemente mostramos la cadena recibida */}
              <p className="text-sm text-gray-500">{k.created_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
