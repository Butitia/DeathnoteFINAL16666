import React from "react";

export default function KillCard({ kill, onEdit, onDelete }) {
  return (
    <article className="card">
      <p><strong>Person ID:</strong> {kill.person_id}</p>
      <p><strong>Description:</strong> {kill.description}</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => onEdit(kill)}>Edit</button>
        <button onClick={() => onDelete(kill.id)}>Delete</button>
      </div>
    </article>
  );
}
