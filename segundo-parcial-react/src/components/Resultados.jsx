import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const getQueryFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('buscador') || '';
  };

  useEffect(() => {
    const queryFromURL = getQueryFromURL();
    setQuery(queryFromURL);

    if (queryFromURL) {
      handleSearch(queryFromURL);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() === '') {
      setMensaje('Por favor, ingresa un término de búsqueda.');
      setResultados([]);
      return;
    }

    try {
      const response = await axios.get(`https://bazaruniversal.somee.com/api/Productos/buscar/${encodeURIComponent(searchQuery)}`);
      setResultados(response.data);
      setMensaje('');
      navigate(`/resultados?buscador=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setMensaje(error.response?.data || 'No se encontraron resultados.');
      setResultados([]);
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/detalle/${id}`);
  };

  return (
    <div className="resultados-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        <button onClick={() => handleSearch(query)}>Buscar</button>
      </div>

      <h2>Resultados encontrados: {resultados.length}</h2>
      {resultados.length > 0 ? (
        resultados.map((producto) => (
          <div
            key={producto.id}
            className="producto"
            onClick={() => handleNavigateToDetail(producto.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="producto-imagen producto-imagen-buscador">
              <img src={producto.miniatura} alt="Producto" />
            </div>
            <div className="producto-texto">
              <h3>{producto.titulo}</h3>
              <p><strong>{producto.categoria}</strong></p>
              <p>{producto.descripcion}</p>
              <strong>${producto.precio} MXN</strong>
              <p>Calificación: <strong>{producto.calificacion}</strong></p>
            </div>
          </div>
        ))
      ) : (
        <p>{mensaje}</p>
      )}
    </div>
  );
};

export default Resultados;
