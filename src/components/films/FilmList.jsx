import React, { useEffect, useState } from "react";
import AddMessage from "../films/AddMessage.jsx";

function FilmList({ films, setSelectedMovie, selectedMovie }) {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addToSelected = (film) => {
    if (!selectedMovie.some((movie) => movie.imdbID === film.imdbID)) {
      setSelectedMovie((prev) => [film, ...prev]);
      setMessage(true);
    }
  };

  return (
    <div className="container">
      <div className="movies-grid">
        {message && <AddMessage />}
        {films.map((film) => (
          <div key={film.imdbID} className="movie-card">
            <img
              src={
                film.Poster !== "N/A" ? film.Poster : "/placeholder-movie.png"
              }
              className="movie-poster"
              alt={film.Title}
              onError={(e) => {
                e.target.src = "/placeholder-movie.png";
              }}
            />
            <div className="movie-info">
              <h3 className="movie-title-card">{film.Title}</h3>
              <div className="movie-details">
                <span>Yıl: {film.Year}</span>
                <span>Tür: {film.Type}</span>
              </div>
              <button
                className="add-to-list-btn"
                onClick={() => addToSelected(film)}
                disabled={selectedMovie.some(
                  (movie) => movie.imdbID === film.imdbID
                )}
              >
                {selectedMovie.some((movie) => movie.imdbID === film.imdbID)
                  ? "Listede Var"
                  : "Listeye Ekle"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;
