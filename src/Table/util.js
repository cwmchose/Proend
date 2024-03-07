const apiUrl = "http://localhost:5050";
// const apiUrl =
//   "https://us-east-2.aws.data.mongodb-api.com/app/data-wlxyk/endpoint";

const mapSort = (event) => {
  return { [event.sortField]: event.sortOrder };
};

export const queryParamsFromEvent = (event) => {
  console.log(event);
  const { filters, page, rows, sortField, sortOrder } = event;
  let qp = `p=${page || 0}&rows${rows}&sf=${sortField}&so=${sortOrder}`;
  Object.entries(filters).forEach(([key, value]) => {
    console.log({ key, value });
    if (value.value != "") {
      qp += `&${key}_v=${value.value}&${key}_m=${value.matchMode}`;
    }
  });
  console.log(qp);
  return qp;
};

export async function getProteins(event, user) {
  queryParamsFromEvent(event);
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

  return {
    totalRecords: results.total,
    proteins: results.proteins,
    page: event.page,
  };
}
