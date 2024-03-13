import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { getProteins, queryParamsFromEvent } from "./util";

import { ProteinViewer } from "./Ngl/Ngl";

// const apiKey = import.meta.env.API_KEY;

const apiUrl = "http://localhost:5050";
// const apiUrl =
//   "https://us-east-2.aws.data.mongodb-api.com/app/data-wlxyk/endpoint";

const mapSort = (event) => {
  return { [event.sortField]: event.sortOrder };
};

function DomainFilter(options) {
  return (
    <Dropdown
      value={options.value}
      options={["bacteria", "eukarya", "archaea", "virus"]}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select One"
      className="p-column-filter"
      showClear
      style={{ minWidth: "12rem" }}
    />
  );
}

export default function Table() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [proteins, setProteins] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 100,
    page: 0,
    sortField: "id",
    sortOrder: 1,
    filters: {
      id: { value: "", matchMode: "contains" },
      gene: { value: "", matchMode: "contains" },
      name: { value: "", matchMode: "contains" },
      motif: { value: "L", matchMode: "contains" },
      species: { value: "", matchMode: "contains" },
      domain: { value: null, matchMode: "contains" },
    },
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);
  //   loadLazyData(user);
  // }, [lazyState, user]);

  const loadLazyData = () => {
    setLoading(true);
    getProteins(lazyState).then((data) => {
      setSearchParams(queryParamsFromEvent(lazyState));
      data.proteins.forEach((d, i) => (d.rowNumber = i));
      setTotalRecords(data.totalRecords);
      setProteins(data.proteins);
      setLoading(false);
    });
  };

  const onPage = (event) => {
    setSearchParams(queryParamsFromEvent(event));
    setExpandedRows(null);
    setCurrentExpanded(null);
    setlazyState(event);
  };

  const onSort = (event) => {
    setSearchParams(queryParamsFromEvent(event));
    setExpandedRows(null);
    setCurrentExpanded(null);
    setlazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setSearchParams(queryParamsFromEvent(event));
    setExpandedRows(null);
    setCurrentExpanded(null);
    setlazyState(event);
  };

  return (
    <div className="page">
      <DataTable
        value={proteins}
        lazy
        filterDisplay="row"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={100}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        onFilter={onFilter}
        filters={lazyState.filters}
        size="small"
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          // this logic allows only 1 row to be expanded, cannot allow multiple due to ngl constraints
          if (!currentExpanded) {
            setExpandedRows(e.data);
            setCurrentExpanded(Object.keys(e.data)[0]);
          } else {
            let newObject = { ...e.data };
            delete newObject[currentExpanded];
            setExpandedRows(newObject);
            setCurrentExpanded(Object.keys(newObject)[0]);
          }
        }}
        rowExpansionTemplate={ProteinPanel}
      >
        <Column
          body={LinkCell}
          field="id"
          header="Protein ID"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="gene"
          header="Gene"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="motif"
          header="Motif"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="species"
          header="Species"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="domain"
          header="Domain"
          filter
          filterElement={DomainFilter}
          showFilterMenu={false}
        />
        <Column expander={true}></Column>
      </DataTable>
    </div>
  );
}

function ProteinPanel({ id }) {
  return (
    <div
      style={{
        height: "400px",
        // backgroundColor: "#f9fafb",
        border: "1px solid #dee2e6",
        padding: "20px",
        overflow: "auto",
      }}
    >
      <ProteinViewer id={id} />
    </div>
  );
}

function LinkCell(protein) {
  const { id } = protein;
  const link = `https://www.uniprot.org/uniprotkb/${id}/entry`;

  return (
    <div>
      <a href={link} target="_blank" rel="noreferrer">
        {id}
      </a>
    </div>
  );
}
