import { TabView, TabPanel } from "primereact/tabview";
import { homoSapienTableData, thermoplasmaTableData } from "./data";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

function IdCell(protein) {
  const { UniProtID } = protein;
  const link = `https://www.uniprot.org/uniprotkb/${UniProtID}/entry`;

  return (
    <div>
      <a href={link} target="_blank" rel="noreferrer">
        {UniProtID}
      </a>
    </div>
  );
}

function ArticleCell(protein) {
  const { ValidatedBy } = protein;

  return (
    <div>
      <a href={ValidatedBy} target="_blank" rel="noreferrer">
        {ValidatedBy}
      </a>
    </div>
  );
}

function Validation() {
  return (
    <div className="page">
      <div>
        <h3>
          Species-Specific HbYX Protein Characterization and Functional
          Validation
        </h3>
        <p>
          Our research extends beyond the identification and prediction of HbYX
          motif-containing proteins to include the characterization of
          species-specific variants and their functional roles across different
          organisms. We are currently working in a full species screening of all
          the HbYX proteins to understand their binding capabilities and
          validate their functions through targeted degradation assays.
        </p>
        <p>
          Our efforts in characterizing these proteins and validating their
          functions underscore the potential of species-specific HbYX proteins
          as novel targets for therapeutic intervention and as tools for
          exploring the evolutionary diversity of proteasome regulation. This
          research not only validates the predictions made by ProEnd but also
          illuminates the complex regulatory networks that govern protein
          degradation, highlighting the importance of HbYX proteins in
          maintaining cellular homeostasis.
        </p>
      </div>
      <div>
        <img
          style={{
            height: "auto",
            display: "block",
            maxWidth: "1800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src="/Validation-Tab-ProteasomePullDownHbYX.png"
        />
      </div>
      <h3>Independently validated proteins</h3>
      <DataTable
        value={[...homoSapienTableData, ...thermoplasmaTableData]}
        scrollable
        sort
        scrollHeight="400px"
        tableStyle={{ minWidth: "50rem", maxHeight: "10rem" }}
      >
        <Column
          body={IdCell}
          sortable
          style={{ width: "25%" }}
          field="UniProtID"
          header="ID"
        ></Column>
        <Column
          sortable
          style={{ width: "25%" }}
          field="Motif"
          header="Motif"
        ></Column>
        <Column
          style={{ width: "25%" }}
          body={ArticleCell}
          sortable
          field="ValidatedBy"
          header="Article"
        ></Column>
      </DataTable>
    </div>
  );
}

export default Validation;
