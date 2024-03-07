import { Link, Outlet } from "react-router-dom";
import logo from "./assets/proend-logo.png";

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
          <Link className="item" to="/findings">
            Findings
          </Link>
          <Link className="item" to="/validation">
            Validation
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
