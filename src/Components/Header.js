import React from "react";

function Header() {
  return (
    <div className="headerbar">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/"> Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}


export default Header;
