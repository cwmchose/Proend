import { Link, Outlet } from "react-router-dom";
import logo from "./assets/proend-logo.png";

// red 235 green 255 blue 255

function Layout() {
  return (
    <>
      <nav className="header">
        <div className="logo-text">
          <img src={logo} />
        </div>

        <div>
          <Link className="item" to="/">
            About
          </Link>
          <Link className="item" to="/table">
            Dataset
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
