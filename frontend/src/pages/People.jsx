import React, { useEffect, useState } from "react";
import api from "../api/api";
import PersonCard from "../components/PersonCard";
import NewPersonForm from "../components/NewPersonForm";
import EditPersonForm from "../components/EditPersonForm";

export default function People() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null); // persona en edición

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

  return (
    <section>
      <h2>People</h2>

      {!editing && <NewPersonForm onCreated={handleCreated} />}

      {editing && (
        <EditPersonForm
          person={editing}
          onUpdated={handleUpdated}
          onCancel={handleCancel}
        />
      )}

      <div className="grid">
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
