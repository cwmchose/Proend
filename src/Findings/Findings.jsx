import { discoveredProteins } from "./discovered-proteins";

function UniprotLink(id) {
  const link = `https://www.uniprot.org/uniprotkb/${id}/entry#structure`;
  return (
    <button onClick={() => window.open(link, "_blank")}>See in Uniprot</button>
  );
}

/*
  gifs were made here: https://ezgif.com/video-to-gif
  with the settings:
  L: 256
  T: 156
  width: 850
  height: 550
 */
function DiscoveredList() {
  return (
    <div className="info-container">
      <h1>Proteins of Interest</h1>
      <p>
        The following proteins were identified by this tool as likely candidates
        for binding to the proteasome. Models on the left are possible multimers
        of the protiens we composed using Alphafold.
      </p>
      {discoveredProteins.map((p, i) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
          key={i}
        >
          <div style={{ maxWidth: "800px" }}>
            <h2 style={{ fontStyle: "italic" }}>{p.species}</h2>
            <h3>{`${p.id} - ${p.name}`}</h3>
            <UniprotLink id={p.id} />
          </div>
          <div>
            <img src={`/${p.id}.gif`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Findings() {
  return (
    <div className="page">
      <h1>Findings</h1>
      <p>
        ProEnd tool, has identified a unique set of proteins with the HbYX
        motif, a key conserved element in proteasomal ATPases and involved in
        various cellular processes from archaea to humans. This discovery was
        initiated in 2007 with the identification of the HbYX motif in proteins
        that interact with the proteasome, including Rpt2, Rpt3, Rpt5, and
        others, highlighting its significant role across different species. The
        HbYX motif's presence in these proteins suggests a specialized function
        in proteasome binding and potentially in guiding the proteasome to
        specific cellular locations or revealing hidden motifs for targeted
        protein degradation. We are implementing AlphaFold Multimer to predict
        the structures of multimeric protein complexes, particularly focusing on
        proteins with the HbYX motif and domains of known activators. This
        approach provides a deeper understanding of how these proteins interact
        within the cell and their potential roles in diseases.
      </p>
      <p>
        By exploring the AlphaFold-predicted structures of these proteins, we
        aim to uncover their functional roles and implications in human health
        and disease. This database serves as a resource for researchers to
        explore the potential of HbYX proteins in regulating various cellular
        processes and offers a platform for the scientific community to engage
        with these complex molecular interactions.
      </p>
      <DiscoveredList />
    </div>
  );
}

export default Findings;
