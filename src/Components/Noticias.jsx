import React, { useEffect, useState } from 'react';
import './Noticias.css'; // Estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Chave de API carregada do .env.local

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setNoticias(data.articles || []);
        } else {
          console.error("Erro ao buscar notícias:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNoticias();
  }, [apiKey]);

  return (
    <div className="noticias-container">
      <h1 className="text-center">Últimas Notícias de Tecnologia</h1>
      <div className="row">
        {noticias.length > 0 ? (
          noticias.map((noticia, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3"> {/* 3 cards por linha em telas maiores e 2 em menores */}
              <div className="card h-100">
                {noticia.urlToImage && (
                  <img src={noticia.urlToImage} alt={noticia.title} className="card-img-top" />
                )}
                <div className="card-body">
                  <h5 className="card-title">{noticia.title}</h5>
                  <p className="card-text">{noticia.description}</p>
                  <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ler mais</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Carregando notícias...</p>
        )}
      </div>
    </div>
  );
};

export default Noticias;
