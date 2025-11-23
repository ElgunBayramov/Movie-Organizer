import React from "react";
import { Link, useParams } from "react-router-dom";

function ListsPage() {
  const { id } = useParams();

  const getLists = () => {
    return JSON.parse(localStorage.getItem("movieLists") || "[]");
  };

  const lists = getLists();

  const deleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      const updatedLists = lists.filter((list) => list.id !== listId);
      localStorage.setItem("movieLists", JSON.stringify(updatedLists));
      window.location.reload();
    }
  };

  if (id) {
    const currentList = lists.find((list) => list.id === id);

    if (!currentList) {
      return (
        <div className="lists-page">
          <div className="main-container">
            <div className="page-header">
              <h1 className="page-title">List Not Found</h1>
              <Link to="/lists" className="back-btn">
                Back to All Lists
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
                Delete List
              </button>
              <Link to="/lists" className="back-btn">
                Back to All Lists
              </Link>
              <Link to="/" className="back-btn">
                Home Page
              </Link>
            </div>
          </div>

          <div className="list-card">
            <div className="list-card-meta">
              {new Date(currentList.createdAt).toLocaleDateString("tr-TR")}{" "}
              created on •{currentList.movies.length} film
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
                    (View on IMDB)
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lists-page">
      <div className="main-container">
        <div className="page-header">
          <h1 className="page-title">My Movie Lists</h1>
          <Link to="/" className="back-btn">
            Home Page
          </Link>
        </div>

        {lists.length === 0 ? (
          <div
            className="text-center"
            style={{ padding: "3rem", color: "var(--text-secondary)" }}
          >
            <h3>You haven't created any lists yet</h3>
            <p>You can add movies and create lists on the home page.</p>
            <Link
              to="/"
              className="view-list-btn"
              style={{
                display: "inline-block",
                width: "auto",
                padding: "1rem 2rem",
              }}
            >
              Go to Home Page
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
                      ...and {list.movies.length - 3} one more film
                    </div>
                  )}
                </div>

                <div className="list-actions">
                  <Link
                    to={`/list/${list.id}`}
                    className="list-action-btn view-list-btn-small"
                  >
                    View Details
                  </Link>
                  <button
                    className="list-action-btn delete-list-btn"
                    onClick={() => deleteList(list.id)}
                  >
                    Delete
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

export default ListsPage;
