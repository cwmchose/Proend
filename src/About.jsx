import prot from "./assets/20S-FrontPage.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="page">
      <div className="front-page-image">
        <img src={prot} />
      </div>
      <div className="text-container">
        <h2>About</h2>
        <p>
          Welcome to <strong>Pro</strong>teasome <strong>En</strong>d regulators{" "}
          <strong>D</strong>atabase- ProEnd, a resource for exploring the
          diverse world of proteasome regulatory proteins across all life forms
          including viruses. ProEnd provides a comprehensive list of proteins
          that feature the HbYX motif—a pivotal tri-peptide sequence that plays
          a crucial role in proteasome function and regulation. These proteins
          potentially cap and modulate the proteasome, thereby influencing
          protein degradation pathways essential for cell regulation, opening
          new avenues for therapeutic intervention.
        </p>
        <h2>What is a Proteasome</h2>
        <p>
          A proteasome is a protein complex in cells responsible for degrading
          unwanted or damaged proteins that have been marked for destruction.
          This process is vital for maintaining the cell's health by regulating
          the concentration of particular proteins and removing misfolded
          proteins that could lead to cellular dysfunction.
        </p>
        <h2>Role of HbYX-Containing Protiens:</h2>
        <p>
          Proteins that contain the HbYX motif are known to interact with the
          20S proteasome, potentially acting as regulators that can either
          activate or inhibit proteasome function. The HbYX motif allows these
          proteins to bind to the proteasome and, depending on their other
          interactions and modifications, these proteins can help to 'cap' the
          proteasome. This capping can either enhance the proteasome's activity
          by stabilizing its active form or inhibit its activity by preventing
          substrate entry, thus regulating protein degradation pathways
          effectively.
        </p>
        <h2>Exclusion of Alanine:</h2>
        <p>
          Despite its hydrophobic nature, alanine was excluded from our search
          criteria for the 'X' position in the HbYX motif. This decision was
          based on alanine's small size, which we anticipated would not provide
          sufficient hydrophobic interaction for meaningful affinity towards the
          proteasome. In the context of proteasome activation and
          protein-protein interactions, the size and the nature of the side
          chain play a pivotal role in ensuring specificity and stability of the
          binding. Alanine, due to its minimal side chain, is less likely to
          contribute to the specific interactions needed for effective
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
        <p>
          In summary, the ProEnd database is a specialized tool designed to
          explore and elucidate the complex interactions involving HbYX motifs
          and proteasomes. It aims to provide a detailed, searchable platform
          that supports both fundamental research and therapeutic discovery
          efforts targeting proteasome regulation. This exploration not only
          advances our understanding of cellular biology but also aids in the
          development of novel strategies for treating diseases related to
          protein degradation, such as cancer and neurodegenerative disorders.
        </p>
        <Link className="table-button" to="/table">
          See Table
        </Link>
      </div>
    </div>
  );
}

export default About;
