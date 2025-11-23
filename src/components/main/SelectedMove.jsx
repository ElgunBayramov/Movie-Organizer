import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import SelectedFilm from "./selectedFilm";

function SelectedMove({ openBar, selectedMovie, setSelectedMovie, setOpen }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="selected-movies-sidebar d-none d-lg-block">
        <SelectedFilm
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      </div>

      {/* Mobile Sidebar */}
      {openBar && (
        <div className="sidebar-mobile d-lg-none">
          <div className="sidebar-content">
            <button className="close-sidebar" onClick={() => setOpen(false)}>
              <AiOutlineClose />
            </button>
            <SelectedFilm
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SelectedMove;
