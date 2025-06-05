import { useState, useEffect } from "react";
import { GetOrders, deleteOrder } from "../../Managers/orderManager";

export const ViewOrders = () => {

  const [orders, setOrders] = useState([])

  // useEffect(() => {
  //   GetOrders().then(setOrders)
  // }, []);


  const handleOrderDelete = (order) => {
    deleteOrder(order).then(() => {
    })
  }
  return (
    <>
     {orders.map((order) => (
        <div key={order?.id}>
          <h3>Order Number: {order.id}</h3>
          <div>Customer Name: {order?.customer?.name}</div>
          <button onClick={handleOrderDelete(order.id)}>Delete Order</button>
          </div>
      ))}
     
    </>
  );
};
