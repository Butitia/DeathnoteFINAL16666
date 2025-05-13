import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function EditKillForm({ kill, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    id: kill.id,
    person_id: kill.person_id,
    description: kill.description,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // cuando cambie 'kill', recargamos el form
    setForm({
      id: kill.id,
      person_id: kill.person_id,
      description: kill.description,
    });
  }, [kill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        person_id: Number(form.person_id),
        description: form.description,
      };
      const res = await api.put(`/kills/${form.id}`, payload);
      onUpdated(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Edit Kill</h3>
      <input
        name="person_id"
        type="number"
        placeholder="Person ID"
        value={form.person_id}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      {error && <p className="error">Error: {error}</p>}
    </form>
  );
}
