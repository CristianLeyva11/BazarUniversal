import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Buscador from './components/Buscador';
import Resultados from './components/Resultados';
import Detalle from './components/Detalle';
import Ventas from './components/Ventas';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-container">
   
        <Header />
        <Routes>
          <Route path="/" element={<Buscador />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
