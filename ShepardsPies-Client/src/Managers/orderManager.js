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

export const updateOrderCost = (orderId) => {
  return fetch(`${apiUrl}/${orderId}/recalculate-total`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderId),
  });
};

export const deleteOrder = (order) => {
  return fetch(`${apiUrl}/${order.id}`,
    {
      method: "DELETE"
    }
  )
}