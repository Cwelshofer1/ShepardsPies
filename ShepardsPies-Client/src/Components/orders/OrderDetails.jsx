import { useState, useEffect } from "react";
import { GetOrders } from "../../Managers/orderManager";
import { useNavigate } from "react-router-dom";
import { getPizzas } from "../../Managers/pizzaManager";


export const OrderDetails = () => {

    const navigate = useNavigate();
    
    const [orders, SetOrders] = useState([]);
    const [pizzas, setPizzas] = useState([]);
  

    const getAllOrders = () => {
        GetOrders().then(SetOrders);
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
    getPizzas().then(setPizzas)
    },[])

const handleAddPizza = (orderId) => {

    navigate(`/pizzaform/${orderId}`)
}

    return (
        <>
            <h2>Order Details</h2>
            {orders.map((order) => (
                <div key={order?.id}>
                    <h2>--Order Number {order.id}--</h2>
                    <div>Table Number: {order?.tableNumber}</div>
                    <div>Customer Name: {order?.customer?.name}</div>
                    <div>Taken By Employee Id: {order?.takenByEmployeeId}</div>
                    <div>Delivered By Employee Id: {order?.deliveredByEmployeeId}</div>
                    <div>Tip Amount: {order?.tipAmount}</div>
                    <div>Total Cost: {order?.totalCost}</div>
                    <div>Order Date: {order?.orderDate}</div>
                    {pizzas.filter((pizza) => pizza.orderId === order.id)
                    .map((pizza) => (
                        <div key={pizza.id}>
                        <div>Pizza Id: {pizza.id} </div>
                        </div>
                    ))}
                    <button onClick={() => handleAddPizza(order.id)}>Add Pizza</button>
                </div>
            ))}
        </>
    );

};
