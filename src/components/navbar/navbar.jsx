import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function Navbar({ setOpen, openBar }) {
  return (
    <div className="navbar" style={{ display: "block" }}>
      <div className="navbar-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>MultiKino</h1>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="menu-toggle" onClick={() => setOpen(!openBar)}>
            {openBar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;