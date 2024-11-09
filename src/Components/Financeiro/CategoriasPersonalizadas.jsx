import React, { useState } from 'react';
import './CategoriasPersonalizadas.css';

const CategoriasPersonalizadas = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');

  const handleAdicionarCategoria = (event) => {
    event.preventDefault();
    if (novaCategoria.trim() === '') return;

    setCategorias([...categorias, novaCategoria]);
    setNovaCategoria('');
  };

  const handleRemoverCategoria = (categoriaParaRemover) => {
    setCategorias(categorias.filter((categoria) => categoria !== categoriaParaRemover));
  };

  return (
    <div className="categorias-container">
      <h2>Categorias Personalizadas</h2>
      <form onSubmit={handleAdicionarCategoria} className="categorias-form">
        <input
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Adicionar nova categoria"
          className="nova-categoria-input"
          required
        />
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>

      <ul className="categorias-lista">
        {categorias.map((categoria, index) => (
          <li key={index} className="categoria-item">
            {categoria}
            <button onClick={() => handleRemoverCategoria(categoria)} className="btn btn-danger">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasPersonalizadas;
