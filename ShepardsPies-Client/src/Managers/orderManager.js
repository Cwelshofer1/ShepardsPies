const apiUrl = "/api/order"

export const GetOrders = () => {
  return fetch(apiUrl).then((res) => res.json());
};
