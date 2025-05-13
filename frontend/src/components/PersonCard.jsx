// frontend/src/components/PersonCard.jsx
import React, { useEffect, useState } from "react";

export default function PersonCard({ person, onDeath }) {
  // Calcula el deadline en milisegundos
  const deadline = new Date(person.created_at).getTime() + 40_000;
  const [remaining, setRemaining] = useState(deadline - Date.now());

  useEffect(() => {
    if (remaining <= 0) {
      onDeath(person.id);
      return;
    }
    const timer = setInterval(() => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        setRemaining(0);
        onDeath(person.id);
      } else {
        setRemaining(diff);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [remaining, deadline, onDeath, person.id]);

  const seconds = Math.ceil(Math.max(0, remaining) / 1000);

  return (
    <div className="bg-white p-4 rounded shadow relative">
      <img
        src={person.photo_url}
        alt={person.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{person.name}</h3>
      <p>Edad: {person.age}</p>
      {remaining > 0 ? (
        <p className="text-red-600 font-semibold">
          Muerte automática en {seconds} s
        </p>
      ) : (
        <p className="text-gray-600">Procesando muerte…</p>
      )}
    </div>
  );
}
