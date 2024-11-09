import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

import './Ventas.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();
  const fetchVentas = async () => {
    try {
      const response = await fetch('https://bazaruniversal.somee.com/api/Ventas');
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };
  const handleNavigateToResults = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="ventas-container">
      <h2>Historial de Ventas</h2>
      <button className="boton-volver" onClick={handleNavigateToResults}>⬅️</button>
      {ventas.length === 0 ? (
        <p>No hay ventas disponibles.</p>
      ) : (
        <div className="ventas-grid">
          {ventas.map((venta) => (
            <div key={venta.id} className="venta-card">
              <img 
                src={venta.producto.miniatura} 
                alt={venta.producto.titulo} 
                className="producto-imagen" 
              />
              <div className="venta-info">
                <h3>{venta.producto.titulo}</h3>
                <p><strong>Marca:</strong> {venta.producto.marca}</p>
                <p><strong>Categoría:</strong> {venta.producto.categoria}</p>
                <p><strong>Cantidad:</strong> {venta.cantidad}</p>
                <p><strong>Precio Unitario:</strong> ${venta.producto.precio}</p>
                <p><strong>Total:</strong> ${venta.total}</p>
                <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ventas;
