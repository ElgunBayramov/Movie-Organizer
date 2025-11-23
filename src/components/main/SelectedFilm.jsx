import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SelectedFilm({ selectedMovie, setSelectedMovie }) {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const saveList = () => {
    if (!listName.trim() || selectedMovie.length === 0) return;

    const newList = {
      id: Date.now().toString(),
      name: listName,
      movies: [...selectedMovie],
      createdAt: new Date().toISOString(),
    };

    const existingLists = JSON.parse(
      localStorage.getItem("movieLists") || "[]"
    );

    existingLists.push(newList);

    localStorage.setItem("movieLists", JSON.stringify(existingLists));

    setSelectedMovie([]);
    setListName("");

    navigate("/lists");
  };

  const removeMovie = (imdbID) => {
    setSelectedMovie((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div>
      <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
        My Movie List
      </h3>

      <input
        type="text"
        className="list-name-input"
        placeholder="Enter list name..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <div className="selected-movies-list">
        {selectedMovie.length === 0 ? (
          <p className="text-muted text-center">No movies added yet</p>
        ) : (
          selectedMovie.map((movie) => (
            <div key={movie.imdbID} className="selected-movie-item">
              <span className="movie-title">
                {movie.Title} ({movie.Year})
              </span>
              <button
                className="delete-btn"
                onClick={() => removeMovie(movie.imdbID)}
                title="Remove Movie"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>

      {selectedMovie.length > 0 && listName.trim() && (
        <button className="save-list-btn" onClick={saveList}>
          Save and View List
        </button>
      )}

      <button className="view-list-btn" onClick={() => navigate("/lists")}>
        View All Listings
      </button>
    </div>
  );
}

export default SelectedFilm;
