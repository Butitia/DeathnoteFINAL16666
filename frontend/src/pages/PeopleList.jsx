// frontend/src/pages/PeopleList.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import NewPersonForm from "../components/NewPersonForm";
import PersonCard from "../components/PersonCard";

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [kills, setKills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga personas y muertes
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, kRes] = await Promise.all([
        api.get("/people"),
        api.get("/kills"),
      ]);
      setPeople(Array.isArray(pRes.data) ? pRes.data : []);
      setKills(Array.isArray(kRes.data) ? kRes.data : []);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No se pudieron cargar las personas o muertes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchAll, []);

  // Callback al expirar los 40s: dispara POST /kills
  const handleDeath = async (personId) => {
    try {
      await api.post("/kills", {
        person_id: personId,
        description: "attack to the heart",
      });
    } catch (err) {
      console.warn("Error al registrar muerte automática:", err);
    } finally {
      fetchAll();
    }
  };

  // Construimos conjunto de IDs muertos
  const deadSet = new Set(kills.map((k) => k.person_id));
  // Filtramos sólo vivos
  const alive = people.filter((p) => !deadSet.has(p.id));

  // Manejo de estados
  if (loading) {
    return <p className="text-center mt-4">Cargando datos…</p>;
  }
  if (error) {
    return <p className="text-center mt-4 text-red-600">{error}</p>;
  }
  // Si no hay ninguna persona (ni vivos ni muertos)
  if (people.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <NewPersonForm onCreated={fetchAll} />
        <p className="text-center mt-4">No hay personas registradas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Formulario para crear persona */}
      <NewPersonForm onCreated={fetchAll} />

      {/* Si no quedan vivos */}
      {alive.length === 0 ? (
        <p className="text-center mt-4">No quedan personas vivas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {alive.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onDeath={handleDeath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
