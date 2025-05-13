import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function EditPersonForm({ person, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    id: person.id,
    name: person.name,
    age: person.age,
    photo_url: person.photo_url,
  });
  const [error, setError] = useState(null);

  // Si cambia la persona que editamos, recargamos el form
  useEffect(() => {
    setForm({
      id: person.id,
      name: person.name,
      age: person.age,
      photo_url: person.photo_url,
    });
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        name: form.name,
        age: Number(form.age),
        photo_url: form.photo_url,
      };
      const res = await api.put(`/people/${form.id}`, payload);
      onUpdated(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Edit Person</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <input
        name="photo_url"
        placeholder="Photo URL"
        value={form.photo_url}
        onChange={handleChange}
        required
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
