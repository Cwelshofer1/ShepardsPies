import { useState, useEffect } from "react";
import { GetOrders } from "../../Managers/orderManager";


export const ViewAllOrders = (() => {
    const [Orders, SetOrders] = useState([]);

    const getAllOrders = () =>
    {
        GetOrders().then(SetOrders);
    };

    useEffect(() => {
        getAllOrders();
    }, []);




return (
        <>
            <h2>All Orders</h2>
            {Orders.map((order) => (
                <div key={order?.id}> 
                    <div>{order?.tableNumber}</div>
                    <div>{order?.customer?.name}</div> 
                    <div>EmployeeId = {order?.takenByEmployeeId}</div>
                    <div>{order?.deliveredByEmployeeId}</div>
                    <div>{order?.tipAmount}</div>
                    <div>{order?.totalCost}</div>
                </div>
            ))}
        </>
    );
})