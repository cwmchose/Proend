import { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProteinViewer } from "./Ngl/Ngl";

// const apiKey = import.meta.env.API_KEY;

const apiUrl = "http://localhost:5050";
// const apiUrl =
//   "https://us-east-2.aws.data.mongodb-api.com/app/data-wlxyk/endpoint";

const mapSort = (event) => {
  return { [event.sortField]: event.sortOrder };
};

async function getProteins(event, user) {
  let results = await fetch(`${apiUrl}/proteins`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user._accessToken}`,
    },
    body: JSON.stringify({
      query: {
        pageNumber: event.page,
        pageSize: event.rows,
        filter: event.filters,
        sort: mapSort(event),
      },
    }),
  }).then((resp) => resp.json());

  return {
    totalRecords: results.total,
    proteins: results.proteins,
    page: event.page,
  };
}

export default function LazyLoadDemo() {
  const { user, createUser } = useContext(UserContext);

  useEffect(() => {
    const createUserNow = async () => {
      if (!user) {
        await createUser();
      }
    };
    createUserNow();
  }, []);

  console.log(user);

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [proteins, setProteins] = useState(null);
  const [selected, setSelected] = useState(null);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: "id",
    sortOrder: 1,
    filters: {
      id: { value: "", matchMode: "contains" },
      name: { value: "", matchMode: "contains" },
      motif: { value: "", matchMode: "contains" },
      species: { value: "", matchMode: "contains" },
      domain: { value: "", matchMode: "contains" },
    },
  });

  useEffect(() => {
    loadLazyData(user);
  }, [lazyState, user]);

  const loadLazyData = (user) => {
    setLoading(true);
    if (!user) return;
    getProteins(lazyState, user).then((data) => {
      data.proteins.forEach((d, i) => (d.rowNumber = i));
      setTotalRecords(data.totalRecords);
      setProteins(data.proteins);
      setLoading(false);
    });
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setlazyState(event);
  };

  const onOpenPanel = (event) => {
    console.log(event);
    setSelected(event.data);
  };

  console.log(selected);

  return (
    <div className="page">
      <DataTable
        value={proteins}
        lazy
        filterDisplay="row"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={10}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        onFilter={onFilter}
        filters={lazyState.filters}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
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
          filterPlaceholder="Search"
        />
        <Column body={ViewCell}></Column>
      </DataTable>
    </div>
  );
}

const headerHeight = 137;
const rowHeight = 85;

function ProteinPanel({ protein }) {
  const { id, rowNumber } = protein;
  console.log(rowNumber);
  const top = headerHeight + rowHeight * (rowNumber + 1) + "px";
  console.log(top);

  console.log("here");
  return (
    <div
      style={{
        height: "400px",
        left: "0",
        top,
        backgroundColor: "#f9fafb",
        border: "1px solid #dee2e6",
        padding: "20px",
        width: "100%",
        position: "absolute",
        overflow: "auto",
        zIndex: "1",
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

function ViewCell(protein) {
  const { id } = protein;
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div>
      {showPanel ? <ProteinPanel protein={protein} /> : <></>}
      <button onClick={() => setShowPanel(!showPanel)}>
        <i className="pi pi-search"></i>
      </button>
    </div>
  );
}
