import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getProteins, queryParamsFromEvent } from "./util";

// const apiKey = import.meta.env.API_KEY;

export default function Table() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { user, createUser } = useContext(UserContext);

  useEffect(() => {
    const createUserNow = async () => {
      if (!user) {
        await createUser();
      }
    };
    createUserNow();
  }, []);

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
      motif: { value: "L", matchMode: "contains" },
      species: { value: "", matchMode: "contains" },
      domain: { value: "", matchMode: "contains" },
    },
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);
  //   loadLazyData(user);
  // }, [lazyState, user]);

  const loadLazyData = () => {
    setLoading(true);
    // if (!user) return;
    getProteins(lazyState).then((data) => {
      setSearchParams(queryParamsFromEvent(lazyState));
      setTotalRecords(data.totalRecords);
      setProteins(data.proteins);
      setLoading(false);
    });
  };

  const onPage = (event) => {
    setSearchParams(queryParamsFromEvent(event));
    setlazyState(event);
  };

  const onSort = (event) => {
    setSearchParams(queryParamsFromEvent(event));
    setlazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setSearchParams(queryParamsFromEvent(event));
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
