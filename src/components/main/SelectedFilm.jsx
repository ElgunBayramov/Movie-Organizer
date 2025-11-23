import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SelectedFilm({
  selectedMovie,
  setSelectedMovie,
}) {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const saveList = () => {
    if (!listName.trim() || selectedMovie.length === 0) return;

    const newList = {
      id: Date.now().toString(),
      name: listName,
      movies: [...selectedMovie],
      createdAt: new Date().toISOString()
    };

    // Mevcut listeleri al
    const existingLists = JSON.parse(localStorage.getItem('movieLists') || '[]');
    
    // Yeni listeyi ekle
    existingLists.push(newList);
    
    // Local storage'a kaydet
    localStorage.setItem('movieLists', JSON.stringify(existingLists));
    
    // Seçili filmleri temizle
    setSelectedMovie([]);
    setListName("");
    
    // Listeler sayfasına yönlendir
    navigate('/lists');
  };

  const removeMovie = (imdbID) => {
    setSelectedMovie(prev => prev.filter(movie => movie.imdbID !== imdbID));
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Film Listem</h3>
      
      <input
        type="text"
        className="list-name-input"
        placeholder="Liste adını girin..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <div className="selected-movies-list">
        {selectedMovie.length === 0 ? (
          <p className="text-muted text-center">Henüz film eklenmedi</p>
        ) : (
          selectedMovie.map((movie) => (
            <div key={movie.imdbID} className="selected-movie-item">
              <span className="movie-title">
                {movie.Title} ({movie.Year})
              </span>
              <button 
                className="delete-btn"
                onClick={() => removeMovie(movie.imdbID)}
                title="Film'i kaldır"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>

      {selectedMovie.length > 0 && listName.trim() && (
        <button className="save-list-btn" onClick={saveList}>
          Listeyi Kaydet ve Görüntüle
        </button>
      )}

      <button 
        className="view-list-btn"
        onClick={() => navigate('/lists')}
      >
        Tüm Listeleri Görüntüle
      </button>
    </div>
  );
}