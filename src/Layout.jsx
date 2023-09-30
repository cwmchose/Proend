import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="header">
        <div className="logo-text">HbYX Protein Database</div>
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
