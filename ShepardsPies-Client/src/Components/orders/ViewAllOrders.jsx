import { useState, useEffect } from "react";
import { GetOrders, CreateOrder } from "../../Managers/orderManager";
import { GetEmployees } from "../../Managers/employeeManager";
import { Navigate, useNavigate } from "react-router-dom";




export const ViewAllOrders = (() => {
    const navigate = useNavigate()
    const [orders, SetOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [takenByEmployee, setTakenByEmployee] = useState([])
    const [deliveryByEmployee, setDeliveryByEmployee] = useState([])

    const getAllOrders = () => {
        GetOrders().then(SetOrders);
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        GetEmployees().then(setEmployees)
    },[]);

    const handleOrderCreate = (() => {
    const order = {
        TableNumber: "",
        CustomerId: "",
        TakenByEmployeeId: takenByEmployee,
        DeliveredByEmployeeId: deliveryByEmployee,
        TipAmount: "",
        TotalCost: "",
        OrderDate: ""
    }
        CreateOrder(order)
        navigate("/createorder")
    });




    return (
        <>
            <h2>All Orders</h2>
            {orders.map((order) => (
                <div key={order?.id}>
                    <div>{order?.tableNumber}</div>
                    <div>{order?.customer?.name}</div>
                    <div>EmployeeId = {order?.takenByEmployeeId}</div>
                    <div>{order?.deliveredByEmployeeId}</div>
                    <div>{order?.tipAmount}</div>
                    <div>{order?.totalCost}</div>
                    <button
                        onClick={handleOrderCreate}>
                        Go to Create Order View</button>
                    <div>

                        <label>Taken by employee:</label>
                        <select
                            value={takenByEmployee}
                            onChange={((e) => setTakenByEmployee(e.target.value))}
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            )
                            )}
                        </select>

                         <label>Delivery employee:</label>
                        <select
                            value={deliveryByEmployee}
                            onChange={((e) => setDeliveryByEmployee(e.target.value))}
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            )
                            )}
                        </select>
                    </div>
                </div>
            ))}
        </>
    );
})