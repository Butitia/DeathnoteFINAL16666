import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem',
    color: 'white', // letras blancas
    fontSize: '1.25rem', // tamaño base mayor (20px aprox)
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  };

  const descriptionStyle = {
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background 0.3s',
  };

  return (
    <main style={containerStyle}>
      {/* Título principal */}
      <h1 style={titleStyle}>Deathnote</h1>

      {/* Breve descripción */}
      <p style={descriptionStyle}>
        Aquí puedes gestionar tus personajes y registrar sus desgracias.
      </p>

      {/* Navegación principal */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <Link
          to="/people"
          style={{ ...buttonStyle, backgroundColor: '#2563eb' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Personas
        </Link>
        <Link
          to="/kills"
          style={{ ...buttonStyle, backgroundColor: '#dc2626' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Muertes
        </Link>
      </nav>

      {/* Contenido adicional */}
      <section style={{ color: '#d1d5db' }}>
        <p>Selecciona una de las opciones de arriba para comenzar.</p>
      </section>
    </main>
  );
}
