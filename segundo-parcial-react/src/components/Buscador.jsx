import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Buscador.css';

function Buscador() {
  const [query, setQuery] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() === '') {
      setMensaje('Por favor, ingresa un término de búsqueda.');
      return;
    }

    navigate(`/resultados/?buscador=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Buscador;
