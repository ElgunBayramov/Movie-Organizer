import React, { useState } from "react";

export default function Search({ setInput }) {
  const [film, setFilm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (film.trim()) {
      setInput(film);
    }
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label">
          <span className="label-text">Filmi başlığa göre arayın:</span>
          <input
            type="text"
            className="search-input"
            placeholder="film ve ya dizi girin..."
            value={film}
            onChange={(e) => setFilm(e.target.value)}
          />
        </label>
        <button type="submit" className="search-btn" disabled={!film.trim()}>
          Ara
        </button>
      </form>
    </div>
  );
}
