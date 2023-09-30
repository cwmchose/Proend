import prot from "./assets/prot2.JPG";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="info-container">
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Link className="table-button" to="/table">
            See Table
          </Link>
        </div>
        <div>
          <img src={prot} />
        </div>
      </div>
    </div>
  );
}

export default About;
