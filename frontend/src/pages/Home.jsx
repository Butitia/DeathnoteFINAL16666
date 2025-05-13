// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bienvenido a DeathNote App
      </h1>

      {/* Breve descripción */}
      <p className="text-lg mb-8 text-center">
        Aquí puedes gestionar tus personajes y registrar sus desgracias.
      </p>

      {/* Navegación principal */}
      <nav className="flex justify-center gap-6 mb-12">
        <Link
          to="/people"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Personas
        </Link>
        <Link
          to="/kills"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Muertes
        </Link>
      </nav>

      {/* Algún contenido adicional opcional */}
      <section className="text-center text-gray-600">
        <p>
          Selecciona una de las opciones de arriba para comenzar.
        </p>
      </section>
    </main>
  );
}
