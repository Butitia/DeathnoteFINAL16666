// frontend/src/components/NewKillForm.jsx
import React, { useState } from "react";
import api from "../api/api";

export default function NewKillForm({ onCreated }) {
  const [personId, setPersonId]     = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading]       = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/kills", {
        person_id:  Number(personId),
        description: description.trim(),
      });
      setPersonId("");
      setDescription("");
      onCreated();       // refresca la lista
    } catch (err) {
      console.error("Error al crear muerte:", err);
      alert("No se pudo registrar la muerte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl mb-4 font-bold">Registrar Muerte</h2>
      <input
        type="number"
        value={personId}
        onChange={e => setPersonId(e.target.value)}
        placeholder="ID de la persona"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Causa de la muerte"
        className="w-full mb-4 p-2 border rounded"
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Registrando…" : "Registrar Muerte"}
      </button>
    </form>
  );
}
