import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";

const proteins = [
  {
    id: "1234",
    name: "cool protein",
    motif: "AYV",
    species: "homo sapian",
    domain: "eukaryota",
  },
  {
    id: "1234",
    name: "cool protein",
    motif: "AYV",
    species: "homo sapian",
    domain: "eukaryota",
  },
  {
    id: "1234",
    name: "cool protein",
    motif: "AYV",
    species: "homo sapian",
    domain: "eukaryota",
  },
  {
    id: "1234",
    name: "cool protein",
    motif: "AYV",
    species: "homo sapian",
    domain: "eukaryota",
  },
];

function App() {
  return (
    <div className="table-container">
      <DataTable
        value={proteins}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="motif" header="Motif"></Column>
        <Column field="species" header="Species"></Column>
        <Column field="domain" header="Domain"></Column>
      </DataTable>
    </div>
  );
}

export default App;
