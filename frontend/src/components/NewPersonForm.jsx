// frontend/src/components/NewPersonForm.jsx
import React, { useState } from "react";
import api from "../api/api";

export default function NewPersonForm({ onCreated }) {
  const [name, setName]         = useState("");
  const [age, setAge]           = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading]   = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/people", {
        name,
        age: Number(age),
        photo_url: photoUrl.trim(),
      });

      const person = res.data;

      // Añadir marca de tiempo local
      const personWithLocalTime = {
        ...person,
        local_created_at: Date.now(),
      };

      setCreatedId(person.id);
      setName("");
      setAge("");
      setPhotoUrl("");
      onCreated(personWithLocalTime);
    } catch (err) {
      console.error("Error al crear persona:", err);
      alert("No se pudo crear la persona.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mb-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-bold">Crear Nueva Persona</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Edad"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
          placeholder="URL de la foto"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creando…" : "Crear Persona"}
        </button>
      </form>

      {createdId && (
        <p className="mt-4 text-green-700">
          ✅ Persona creada con ID: <strong>{createdId}</strong>
        </p>
      )}
    </div>
  );
}
