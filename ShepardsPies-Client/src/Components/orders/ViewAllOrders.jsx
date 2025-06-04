import { useState, useEffect } from "react";
import { GetOrders, CreateOrder } from "../../Managers/orderManager";
import { GetEmployees } from "../../Managers/employeeManager";
import { useNavigate } from "react-router-dom";

export const ViewAllOrders = () => {
    const navigate = useNavigate();
    const [orders, SetOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [takenByEmployee, setTakenByEmployee] = useState("");
    const [deliveryByEmployee, setDeliveryByEmployee] = useState("");
    const toNullableInt = (val) => val === "" ? null : parseInt(val);

    const getAllOrders = () => {
        GetOrders().then(SetOrders);
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        GetEmployees().then(setEmployees);
    }, []);

    const handleOrderCreate = () => {
        const order = {
            TableNumber: toNullableInt(""),
            CustomerId: null,
            TakenByEmployeeId: toNullableInt(takenByEmployee),
            DeliveredByEmployeeId: toNullableInt(deliveryByEmployee),
            TipAmount: null,
            TotalCost: null,
        };

        CreateOrder(order).then(() => navigate("/createorder"));
    };

    return (
        <>
            <div>
                <h3>Create New Order</h3>
                <label>Taken by employee:</label>
                <select
                    value={takenByEmployee}
                    onChange={(e) => setTakenByEmployee(e.target.value)}
                >
                    <option value="">-- Select Employee --</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                <label>Delivery employee:</label>
                <select
                    value={deliveryByEmployee}
                    onChange={(e) => setDeliveryByEmployee(e.target.value)}
                >
                    <option value="">-- Select Employee --</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                <button onClick={handleOrderCreate}>Go to Create Order View</button>
            </div>
            <h2>All Orders</h2>
            {orders.map((order) => (
                <div key={order?.id}>
                    <h3>Order Number: {order.id}</h3>
                    <div>Customer Name: {order?.customer?.name}</div>
                </div>
            ))}
        </>
    );

};
