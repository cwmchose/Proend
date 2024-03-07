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
          <h2>Amino Acid Selection for HbYX Motif Identification</h2>
          <p>
            In our quest to comprehensively identify HbYX motif-containing
            proteins using the ProEnd tool, the selection of amino acids for the
            'X' position in the HbYX motif was guided by a combination of
            biochemical properties and functional considerations. Understanding
            the rationale behind our selection criteria is crucial for
            appreciating the depth and specificity of our search methodology.
          </p>
          <h2>Exclusion of Alanine:</h2>
          <p>
            Despite its hydrophobic nature, alanine was excluded from our search
            criteria for the 'X' position in the HbYX motif. This decision was
            based on alanine's small size, which we anticipated would not
            provide sufficient hydrophobic interaction for meaningful affinity
            towards the proteasome. In the context of proteasome activation and
            protein-protein interactions, the size and the nature of the side
            chain play a pivotal role in ensuring specificity and stability of
            the binding. Alanine, due to its minimal side chain, is less likely
            to contribute to the specific interactions needed for effective
            proteasomal activation.
          </p>
          <h2>Exclusion of Cysteine:</h2>
          <p>
            Cysteine presents a unique case; while it is hydrophobic, its
            electronegative sulfur atom and propensity to form disulfide bonds
            impart it with distinct properties that are not typically conducive
            for the role of a proteasome activator. Disulfide bonds can lead to
            rigid structures that might not be preferable in the dynamic context
            of proteasome interaction. Additionally, the reactivity of cysteine
            could interfere with the proteasome's functional integrity or
            specificity, leading to its exclusion from our selection criteria.
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
