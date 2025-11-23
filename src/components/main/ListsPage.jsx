import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ListsPage() {
  const { id } = useParams();

  // Local storage'dan listeleri al
  const getLists = () => {
    return JSON.parse(localStorage.getItem("movieLists") || "[]");
  };

  const lists = getLists();

  // Belirli bir listeyi sil
  const deleteList = (listId) => {
    if (window.confirm("Bu listeyi silmek istediğinizden emin misiniz?")) {
      const updatedLists = lists.filter((list) => list.id !== listId);
      localStorage.setItem("movieLists", JSON.stringify(updatedLists));
      window.location.reload(); // Sayfayı yenile
    }
  };

  // Eğer belirli bir liste ID'si varsa, sadece o listeyi göster
  if (id) {
    const currentList = lists.find((list) => list.id === id);

    if (!currentList) {
      return (
        <div className="lists-page">
          <div className="main-container">
            <div className="page-header">
              <h1 className="page-title">Liste Bulunamadı</h1>
              <Link to="/lists" className="back-btn">
                Tüm Listelere Dön
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="lists-page">
        <div className="main-container">
          <div className="page-header">
            <h1 className="page-title">{currentList.name}</h1>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="back-btn"
                onClick={() => deleteList(currentList.id)}
                style={{ background: "var(--danger)" }}
              >
                Listeyi Sil
              </button>
              <Link to="/lists" className="back-btn">
                Tüm Listelere Dön
              </Link>
              <Link to="/" className="back-btn">
                Ana Sayfa
              </Link>
            </div>
          </div>

          <div className="list-card">
            <div className="list-card-meta">
              {new Date(currentList.createdAt).toLocaleDateString("tr-TR")}{" "}
              tarihinde oluşturuldu •{currentList.movies.length} film
            </div>

            <div className="list-card-movies">
              {currentList.movies.map((movie, index) => (
                <div key={movie.imdbID} className="list-movie-item">
                  <strong>{index + 1}.</strong> {movie.Title} ({movie.Year})
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: "1rem",
                      color: "var(--accent)",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                    }}
                  >
                    (IMDB'de görüntüle)
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tüm listeleri göster
  return (
    <div className="lists-page">
      <div className="main-container">
        <div className="page-header">
          <h1 className="page-title">Film Listelerim</h1>
          <Link to="/" className="back-btn">
            Ana Sayfa
          </Link>
        </div>

        {lists.length === 0 ? (
          <div
            className="text-center"
            style={{ padding: "3rem", color: "var(--text-secondary)" }}
          >
            <h3>Henüz hiç liste oluşturmadınız</h3>
            <p>Ana sayfada film ekleyip liste oluşturabilirsiniz.</p>
            <Link
              to="/"
              className="view-list-btn"
              style={{
                display: "inline-block",
                width: "auto",
                padding: "1rem 2rem",
              }}
            >
              Ana Sayfaya Git
            </Link>
          </div>
        ) : (
          <div className="lists-grid">
            {lists.map((list) => (
              <div key={list.id} className="list-card">
                <div className="list-card-header">
                  <h3 className="list-card-title">{list.name}</h3>
                </div>

                <div className="list-card-meta">
                  {new Date(list.createdAt).toLocaleDateString("tr-TR")} •{" "}
                  {list.movies.length} film
                </div>

                <div className="list-card-movies">
                  {list.movies.slice(0, 3).map((movie, index) => (
                    <div key={movie.imdbID} className="list-movie-item">
                      {movie.Title} ({movie.Year})
                    </div>
                  ))}
                  {list.movies.length > 3 && (
                    <div className="list-movie-item text-muted">
                      ...ve {list.movies.length - 3} film daha
                    </div>
                  )}
                </div>

                <div className="list-actions">
                  <Link
                    to={`/list/${list.id}`}
                    className="list-action-btn view-list-btn-small"
                  >
                    Listeyi Görüntüle
                  </Link>
                  <button
                    className="list-action-btn delete-list-btn"
                    onClick={() => deleteList(list.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
