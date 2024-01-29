import { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
        <Column body={LinkCell}></Column>
      </DataTable>
    </div>
  );
}

function LinkCell(protein) {
  const { id } = protein;
  const link = `https://www.uniprot.org/uniprotkb/${id}/entry#structure`;
  return <button onClick={() => window.open(link, "_blank")}>uniprot</button>;
}
