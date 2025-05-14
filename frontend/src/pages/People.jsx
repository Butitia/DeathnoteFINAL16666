import React, { useEffect, useState } from "react";
import api from "../api/api";
import PersonCard from "../components/PersonCard";
import NewPersonForm from "../components/NewPersonForm";
import EditPersonForm from "../components/EditPersonForm";

export default function People() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.get("/people").then(res => setPeople(res.data)).catch(console.error);
  }, []);

  const handleCreated = (newPerson) => {
    setPeople((prev) => [...prev, newPerson]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/people/${id}`);
    setPeople((prev) => prev.filter((p) => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const handleEdit = (person) => {
    setEditing(person);
  };

  const handleUpdated = (updatedPerson) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  // Estilos visuales consistentes
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
      <h2 style={titleStyle}>Personas Registradas</h2>

      {!editing && <NewPersonForm onCreated={handleCreated} />}

      {editing && (
        <EditPersonForm
          person={editing}
          onUpdated={handleUpdated}
          onCancel={handleCancel}
        />
      )}

      <div style={gridStyle}>
        {people.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
