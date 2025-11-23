import Navbar from "./components/navbar/navbar";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import FilmList from "./components/films/FilmList";
import Search from "./components/main/Search";
import { Route, Routes, useLocation } from "react-router-dom";
import ListsPage from "./components/main/ListsPage";
import SelectedMove from "./components/main/SelectedMove";

function App() {
  const [input, setInput] = useState("");
  const [films, setFilms] = useState([]);
  const [openBar, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const location = useLocation();

  // Local storage'dan seçili filmleri yükle
  useEffect(() => {
    const savedMovies = localStorage.getItem("selectedMovies");
    if (savedMovies) {
      setSelectedMovie(JSON.parse(savedMovies));
    }
  }, []);

  // Seçili filmler değiştiğinde local storage'a kaydet
  useEffect(() => {
    localStorage.setItem("selectedMovies", JSON.stringify(selectedMovie));
  }, [selectedMovie]);

  useEffect(() => {
    if (input && input.length > 2) {
      const timer = setTimeout(() => {
        axios
          .get(`https://www.omdbapi.com/?s=${input}&apikey=82778cb5`)
          .then(function (response) {
            if (response.data.Search) {
              setFilms(response.data.Search);
            } else {
              setFilms([]);
            }
          })
          .catch((err) => {
            console.log(err);
            setFilms([]);
          });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setFilms([]);
    }
  }, [input]);

  // Ana sayfada mıyız kontrolü
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className="App">
        <Navbar setOpen={setOpen} openBar={openBar} />

        {isHomePage ? (
          <div className="main-container">
            <div className="main-content">
              <div>
                <Search setInput={setInput} />
                {films.length > 0 && (
                  <FilmList
                    films={films}
                    setSelectedMovie={setSelectedMovie}
                    selectedMovie={selectedMovie}
                  />
                )}
              </div>

              <SelectedMove
                openBar={openBar}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                setOpen={setOpen}
              />
            </div>
          </div>
        ) : null}
      </div>

      <Routes>
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/list/:id" element={<ListsPage />} />
      </Routes>
    </>
  );
}

export default memo(App);
