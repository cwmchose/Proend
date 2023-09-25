import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { useEffect } from "react";
import data from "./data/output.json";

function App() {
  const [proteins] = useState(data);

  console.log(proteins.length);
  return (
    <div className="table-container">
      <DataTable
        globalFilterFields={["id", "name", "species", "motif"]}
        paginator
        removableSort
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        value={proteins}
      >
        <Column sortable filter field="id" header="ID"></Column>
        <Column sortable filter field="name" header="Name"></Column>
        <Column sortable filter field="motif" header="Motif"></Column>
        <Column sortable filter field="species" header="Species"></Column>
        <Column sortable field="domain" header="Domain"></Column>
      </DataTable>
    </div>
  );
}

export default App;
