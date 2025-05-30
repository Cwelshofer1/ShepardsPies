const apiUrl = "/api/order"

export const GetOrders = () => {
  return fetch(apiUrl).then((res) => res.json());
};


export const CreateOrder = (order) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(order),
}).then((res) => res.json());
};