import prot from "./assets/prot2.JPG";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="info-container">
          <h1>About</h1>
          <p>
            Welcome to ProEnd - go-to tool for exploring the universe of
            proteins! ProEnd is a gateway to understanding the crucial role of
            proteasomes in health and disease. By focusing on the regulators of
            proteasomes, this tool shines a spotlight on the 20S proteasome
            architecture and the intriguing HbYX motif. Did you know this tiny
            tri-peptide motif is a key player in the protein degradation
            pathways? With ProEnd, you get to discover new molecules and explore
            the significance of proteasome regulators, as it seamlessly sifts
            through proteins searching for the enigmatic HbYX molecules. Dive in
            to unravel the mysteries of proteins and join us in the exciting
            journey of discovery!
          </p>
          <Link className="table-button" to="/table">
            See Table
          </Link>
          {/* <div>
            <img src={protGrid} height={"300px"} />
          </div> */}
        </div>
        <div>
          <img src={prot} />
        </div>
      </div>
    </div>
  );
}

export default About;
