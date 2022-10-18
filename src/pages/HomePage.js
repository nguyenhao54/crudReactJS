import React from "react";
import { Outlet } from "react-router-dom";
function HomePage() {
  return (
    <div className="page">
      <div className="header">Homepage</div>

      <Outlet />
    </div>
  );
}

export default HomePage;
