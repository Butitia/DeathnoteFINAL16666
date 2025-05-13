// frontend/src/App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PeopleList from "./pages/PeopleList";
import KillsList from "./pages/KillsList";

export default function App() {
  return (
    <BrowserRouter>
      {/* Barra de navegación global */}
      <nav className="bg-gray-800 p-4 text-white">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <Link to="/"       className="hover:underline">Home</Link>
          <Link to="/people" className="hover:underline">Personas</Link>
          <Link to="/kills"  className="hover:underline">Muertes</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* Página de inicio */}
          <Route path="/"       element={<Home />} />

          {/* Listado de personas con temporizador */}
          <Route path="/people" element={<PeopleList />} />

          {/* Listado de muertes */}
          <Route path="/kills"  element={<KillsList />} />

          {/* Cualquier otra ruta redirige a Home */}
          <Route path="*"       element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
