import React, { useEffect, useState } from "react";
import api from "../api/api";
import KillCard from "../components/KillCard";
import NewKillForm from "../components/NewKillForm";
import EditKillForm from "../components/EditKillForm";

export default function Kills() {
  const [kills, setKills] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.get("/kills").then(res => setKills(res.data)).catch(console.error);
  }, []);

  const handleCreated = (newKill) => {
    setKills((prev) => [...prev, newKill]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/kills/${id}`);
    setKills((prev) => prev.filter((k) => k.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const handleEdit = (kill) => {
    setEditing(kill);
  };

  const handleUpdated = (updatedKill) => {
    setKills((prev) =>
      prev.map((k) => (k.id === updatedKill.id ? updatedKill : k))
    );
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  // Estilos en línea
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
    textAlign: 'center',
    marginBottom: '1.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gap: '1.5rem',
    marginTop: '2rem',
  };

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>Muertes Registradas</h2>

      {!editing && <NewKillForm onCreated={handleCreated} />}

      {editing && (
        <EditKillForm
          kill={editing}
          onUpdated={handleUpdated}
          onCancel={handleCancel}
        />
      )}

      <div style={gridStyle}>
        {kills.map((kill) => (
          <KillCard
            key={kill.id}
            kill={kill}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
