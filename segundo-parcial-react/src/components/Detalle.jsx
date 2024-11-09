import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [query, setQuery] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`https://bazaruniversal.somee.com/api/Productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleSearch = async () => {
    if (query.trim() === '') {
      setMensaje('Por favor, ingresa un término de búsqueda.');
      return;
    }

    try {
      const response = await axios.get(`https://bazaruniversal.somee.com/api/Productos/buscar/${encodeURIComponent(query)}`);
      const resultados = response.data;
      navigate(`/resultados?buscador=${encodeURIComponent(query)}`, { state: { resultados, query } });
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setMensaje(error.response?.data || 'No se encontraron resultados.');
    }
  };

  const handleCompra = async () => {
    const confirmar = window.confirm(`¿Estás seguro que deseas comprar "${producto.titulo}" por $${producto.precio} MXN?`);
    if (!confirmar) return;

    try {
      const venta = {
        idProducto: producto.id,
        cantidad: 1
      };

      await axios.post('https://bazaruniversal.somee.com/api/Ventas/registrar', venta);
      alert('¡Compra realizada con éxito!');
      navigate('/');
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un error al realizar la compra.');
    }
  };

  const handleNavigateToResults = () => {
    navigate('/');
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalle-container">
      <div className="search-bar buscador-detalle">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      
      <button className="boton-volver" onClick={handleNavigateToResults}>⬅️</button>
      <div className="detalle-imagen">
        <img src={producto.miniatura} alt={producto.titulo} />
      </div>
      <div className="detalle-texto">
        <h2>{producto.titulo}</h2>
        <p><strong>{producto.categoria}</strong></p>
        <p>{producto.descripcion}</p>
        <div className="detalle-precio">
          <p><strong>Precio: ${producto.precio} MXN</strong></p>
          <p>Calificación: <strong>{producto.calificacion}</strong></p>
        </div>
        <button className="boton-comprar" onClick={handleCompra}>Comprar</button>
      </div>
    </div>
  );
};

export default Detalle;
