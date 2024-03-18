const apiUrl = "http://localhost:5050";
// const apiUrl =
//   "https://us-east-2.aws.data.mongodb-api.com/app/data-wlxyk/endpoint";

const mapSort = (event) => {
  return { [event.sortField]: event.sortOrder };
};

export const queryParamsFromEvent = (event) => {
  const { filters, page, rows, sortField, sortOrder } = event;
  // let qp = `p=${page || 0}&rows=${rows}&sf=${sortField}&so=${sortOrder}`;
  const qp = {
    p: page || 0,
    rows: rows,
    sf: sortField,
    so: sortOrder,
  };
  Object.entries(filters).forEach(([key, value]) => {
    if (value.value != "" && value.value != null) {
      qp[key] = value.value;
    }
    if (value.matchMode != "" && value.value != null) {
      qp[key + "m"] = value.matchMode;
    }
  });
  return qp;
};

export async function getProteins(event, user) {
  // queryParamsFromEvent(event);
  let results = await fetch(`${apiUrl}/proteins`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      //   Authorization: `Bearer ${user._accessToken}`,
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

  console.log(results);
  return {
    success: results.success,
    totalRecords: results.total,
    proteins: results.proteins,
    page: event.page,
  };
}
