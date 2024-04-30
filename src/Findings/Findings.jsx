import { viralProteins, archaealProteins } from "./discovered-proteins";
import { obeliskData } from "./obeliskTableData";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const viralText =
  "By exploring the AlphaFold-predicted structures of viral proteins, we aim to uncover new functional roles and implications in human health and disease.The following proteins were identified by this tool as likely candidates for binding to the proteasome. Models on the left are possible oligomers of the proteins we predicted by using Alphafold multimer.";
const archaeaText =
  "Currently, we are implementing AlphaFold Multimer to predict the structures of multimeric protein complexes, particularly focusing on proteins with the HbYX motif and domains of known PAN activators. In addition, we are testing recombinants of  these proteins to check activity and binding to the archeal 20S proteasome.";

function UniprotLink(id) {
  const link = `https://www.uniprot.org/uniprotkb/${id}/entry#structure`;
  return (
    <button onClick={() => window.open(link, "_blank")}>See in Uniprot</button>
  );
}

function CaptionGif({ src, caption }) {
  return (
    <div>
      <img src={src} />
      <p>{caption}</p>
    </div>
  );
}

function ObeliskSection() {
  return (
    <>
      <div>
        <p>This table contains the known obelisks with the HbYX Motif</p>
        <DataTable
          value={obeliskData}
          scrollable
          scrollHeight="400px"
          tableStyle={{ minWidth: "50rem", maxHeight: "10rem" }}
        >
          <Column style={{ width: "25%" }} field="ID" header="ID"></Column>
          <Column
            style={{ width: "25%" }}
            field="Sequence"
            header="Motif"
          ></Column>
          {/* <Column
            field="Obelisk_seq"
            style={{ maxWidth: "25%", overflow: "hidden" }}
            header="Genetic Sequence"
          ></Column>
          <Column
            field="largest_cen_ORF"
            style={{ maxWidth: "25%", overflow: "hidden" }}
            header="Protein Sequence"
          ></Column> */}
        </DataTable>
        <p>
          The following models are obelisks contructed via alphafold that may be
          proteasome activators
        </p>
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <div>
            <div>
              <h2 style={{ fontStyle: "italic" }}>Obelisk-000028</h2>
              <div className="gifs-container">
                <CaptionGif
                  src={"/Obelisk-000028.gif"}
                  caption="Obelisk-000028 monomer"
                />
                <CaptionGif
                  src={"/Obelisk000028-Hexamer.gif"}
                  caption="Obelisk-000028 monomer"
                />
                <CaptionGif
                  src={"/Obelisk28inComplexMonomer.gif"}
                  caption="Potential binding configuration of Obelisk-000028 and 20S proteasome via HbYX"
                />
              </div>
            </div>
            <div>
              <h2 style={{ fontStyle: "italic" }}>Obelisk-000811</h2>
              <div className="gifs-container">
                <CaptionGif
                  src={"/Obelisk-00811.gif"}
                  caption="Obelisk-000811 monomer"
                />
              </div>
            </div>
            <div>
              <h2 style={{ fontStyle: "italic" }}>Obelisk-000684</h2>
              <div className="gifs-container">
                <CaptionGif
                  src={"/Obelisk684inOligomer.gif"}
                  caption="Obelisk-000684 assembled as a hexamer"
                />
                <CaptionGif
                  src={"/Obelisk684OligomerIncomplex20S.gif"}
                  caption="Potential binding of Obelisk-000684 hexamer and the 20S proteasome"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  function SectionBlock({ text, discoveredProteins }) {
    return (
      <>
        <p>{text}</p>
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
      </>
    );
  }

  return (
    <div className="info-container">
      <h2>Proteins of Interest</h2>
      <p>
        The following proteins were identified by this tool as likely candidates
        for binding to the proteasome. Models on the left are possible multimers
        of the protiens we composed using Alphafold.
      </p>
      <TabView>
        <TabPanel header="Viral">
          <SectionBlock text={viralText} discoveredProteins={viralProteins} />
        </TabPanel>
        <TabPanel header="Archaea">
          <SectionBlock
            text={archaeaText}
            discoveredProteins={archaealProteins}
          />
        </TabPanel>
        <TabPanel header="Obelisks">
          <ObeliskSection />
        </TabPanel>
      </TabView>
    </div>
  );
}

function Findings() {
  return (
    <div className="page">
      <h2>Findings</h2>
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
        protein degradation.
      </p>
      <p>
        Currently, we are implementing AlphaFold Multimer to predict the
        structures of multimeric protein complexes, particularly focusing on
        proteins with the HbYX motif and domains of known activators. This
        approach provides a deeper understanding of how these proteins interact
        within the cell and their potential roles in diseases.
      </p>
      <DiscoveredList />
    </div>
  );
}

export default Findings;
