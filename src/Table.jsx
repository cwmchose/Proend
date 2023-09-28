import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import data from "./data/output.json";

const baseUrl = "http://localhost:5050";

function Table() {
  let [proteins, setProteins] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      let results = await fetch(`${baseUrl}/proteins/`).then((resp) =>
        resp.json()
      );
      console.log(results);
      setProteins(results);
    };

    loadPosts();
  }, []);

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

export default Table;
