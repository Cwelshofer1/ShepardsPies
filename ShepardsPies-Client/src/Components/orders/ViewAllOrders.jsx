import { useState, useEffect } from "react";
import { GetOrders, CreateOrder } from "../../Managers/orderManager";
import { GetEmployees } from "../../Managers/employeeManager";
import { GetCustomers } from "../../Managers/customerManager";
import { useNavigate } from "react-router-dom";

export const ViewAllOrders = () => {
  const navigate = useNavigate();
  const [orders, SetOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [tipAmount, setTipAmount] = useState("");

  const [employees, setEmployees] = useState([]);
  const [takenByEmployee, setTakenByEmployee] = useState("");
  const [deliveryByEmployee, setDeliveryByEmployee] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const toNullableInt = (val) => (val === "" ? null : parseInt(val));
  const toNullableDecimal = (val) => val === "" ? null : parseFloat(val);

  const getAllOrders = () => {
    GetOrders().then(SetOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    GetEmployees().then(setEmployees);
  }, []);

  useEffect(() => {
    GetCustomers().then(setCustomers);
  }, []);

  const handleOrderCreate = () => {
    const order = {
      TableNumber: toNullableInt(tableNumber),
      CustomerId: toNullableInt(selectedCustomerId),
      TakenByEmployeeId: toNullableInt(takenByEmployee),
      DeliveredByEmployeeId: toNullableInt(deliveryByEmployee),
      TipAmount: toNullableDecimal(tipAmount),
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

        <label>Customer Name:</label>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        >
          <option value="">-- Select Customer --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <label>Table Number:</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
        />

        <label>Tip Amount:</label>
        <input
          type="number"
          step="any"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          placeholder="Enter tip (e.g. 4.25)"
        />

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
