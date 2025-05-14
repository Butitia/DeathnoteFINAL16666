import React, { useEffect, useState } from "react";
import api from "../api/api";
import NewKillForm from "../components/NewKillForm";

export default function KillsList() {
  const [kills, setKills] = useState([]);
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

  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem',
    color: 'white',
    fontSize: '1.1rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const cardStyle = {
    backgroundColor: 'white',
    color: '#111',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Registrar Muerte</h2>

      <NewKillForm onCreated={fetchKills} />

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Cargando muertes…</p>
      ) : kills.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Aún no hay muertes registradas.</p>
      ) : (
        <ul style={listStyle}>
          {kills.map(k => (
            <li key={k.id} style={cardStyle}>
              <p><strong>Persona ID:</strong> {k.person_id}</p>
              <p><strong>Causa:</strong> {k.description}</p>
              <p style={{ fontSize: '0.875rem', color: '#555' }}>{k.created_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
