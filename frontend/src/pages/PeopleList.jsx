import React, { useEffect, useState } from "react";
import api from "../api/api";
import NewPersonForm from "../components/NewPersonForm";
import PersonCard from "../components/PersonCard";

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [kills, setKills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDeath = async (personId) => {
    try {
      await api.post("/kills", {
        person_id: personId,
        description: "Infarto :(",
      });
    } catch (err) {
      console.warn("Error al registrar muerte automática:", err);
    } finally {
      fetchAll();
    }
  };

  const deadSet = new Set(kills.map((k) => k.person_id));
  const alive = people.filter((p) => !deadSet.has(p.id));

  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem',
    color: 'white',
    fontSize: '1.1rem',
  };

  const gridStyle = {
    display: 'grid',
    gap: '1.5rem',
    marginTop: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  };

  return (
    <div style={containerStyle}>
      <NewPersonForm onCreated={(newPerson) => {
        setPeople((prev) => [...prev, newPerson]);
      }} />

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Cargando datos…</p>
      ) : error ? (
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#f87171' }}>{error}</p>
      ) : people.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>No hay personas registradas.</p>
      ) : alive.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>No quedan personas vivas.</p>
      ) : (
        <div style={gridStyle}>
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
