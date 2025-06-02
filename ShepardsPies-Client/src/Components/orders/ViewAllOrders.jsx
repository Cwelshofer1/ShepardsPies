import { useState, useEffect } from "react";
import { GetOrders } from "../../Managers/orderManager";
import { Navigate, useNavigate } from "react-router-dom";




export const ViewAllOrders = (() => {
    const navigate = useNavigate()
    const [Orders, SetOrders] = useState([]);

    const getAllOrders = () =>
    {
        GetOrders().then(SetOrders);
    };

    useEffect(() => {
        getAllOrders();
    }, []);

const handleOrderCreate = (() => {
    navigate("/createorder")
})




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
                    <button
                    onClick={handleOrderCreate}
                    >Create Order</button>
                </div>
            ))}
        </>
    );
})