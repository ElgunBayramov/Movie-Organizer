import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Search from "./components/main/Search";
import FilmList from "./components/films/FilmList";
import SelectedMove from "./components/main/SelectedMove";
import ListsPage from "./components/main/ListsPage";

function App() {
  const [input, setInput] = useState("");
  const [films, setFilms] = useState([]);
  const [openBar, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedMovies = localStorage.getItem("selectedMovies");
    if (savedMovies) {
      setSelectedMovie(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedMovies", JSON.stringify(selectedMovie));
  }, [selectedMovie]);

  useEffect(() => {
    if (!input || input.length < 3) {
      setFilms([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${input}&apikey=82778cb5`
        );

        setFilms(response.data.Search || []);
      } catch (error) {
        console.error(error);
        setFilms([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

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

export default App;
