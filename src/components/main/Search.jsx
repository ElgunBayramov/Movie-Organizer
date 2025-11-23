import React, { useState } from "react";

function Search({ setInput }) {
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
          <span className="label-text">Search for movie by title:</span>
          <input
            type="text"
            className="search-input"
            placeholder="Enter a movie or series..."
            value={film}
            onChange={(e) => setFilm(e.target.value)}
          />
        </label>
        <button type="submit" className="search-btn" disabled={!film.trim()}>
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
