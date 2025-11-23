import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Links() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getListsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("movieLists") || "[]");
  };

  const movieLists = getListsFromLocalStorage();
  const currentList = movieLists.find((list) => list.id === id);

  const handleBack = () => {
    navigate("/");
  };

  if (!currentList) {
    return (
      <div className="lists-page">
        <div className="container">
          <div className="page-header">
            <h1>Liste Bulunamadı</h1>
            <button onClick={handleBack} className="back-btn">
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lists-page">
      <div className="container">
        <div className="page-header">
          <h1>{currentList.title}</h1>
          <button onClick={handleBack} className="back-btn">
            Ana Sayfaya Dön
          </button>
        </div>

        <div className="movie-lists">
          <h3 className="mb-3">Listedeki Filmler:</h3>
          {currentList.movies.map((movie) => (
            <div key={movie.imdbID} className="movie-list-item">
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                {movie.Title} ({movie.Year}) - IMDB'de aç
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
