import { useState, useEffect } from "react";
import { GetOrders } from "../../Managers/orderManager";

export const ViewOrders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    GetOrders().then(setOrders)
  }, []);

  return (
    <>
     {orders.map((order) => (
        <div key={order?.id}>
          <h3>Order Number: {order.id}</h3>
          <div>Customer Name: {order?.customer?.name}</div>
          </div>
      ))};
     
    </>
  );
};
