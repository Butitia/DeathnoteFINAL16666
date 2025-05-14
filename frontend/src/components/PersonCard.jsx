// frontend/src/components/PersonCard.jsx
import React, { useEffect, useState } from "react";

export default function PersonCard({ person, onDeath }) {
  const TOTAL_TIME = 40000; // 40 segundos
  const localCreatedAt = person.local_created_at || new Date(person.created_at).getTime();
  const deadline = localCreatedAt + TOTAL_TIME;
  const [remaining, setRemaining] = useState(deadline - Date.now());

  useEffect(() => {
    const updateRemaining = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        onDeath(person.id);
      } else {
        setRemaining(diff);
        timeoutId = setTimeout(updateRemaining, 500);
      }
    };

    let timeoutId = setTimeout(updateRemaining, 500);

    return () => clearTimeout(timeoutId);
  }, [deadline, onDeath, person.id]);

  const seconds = Math.ceil(Math.max(0, remaining) / 1000);
  const percentage = Math.max(0, 100 - (remaining / TOTAL_TIME) * 100);

  // Color dinámico basado en el porcentaje restante
  const getColor = () => {
    if (percentage < 33) return "bg-green-500";
    if (percentage < 66) return "bg-yellow-500";
    return "bg-red-600";
  };

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

      {/* Barra de progreso */}
      <div className="mt-3 h-3 w-full bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-linear ${getColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
