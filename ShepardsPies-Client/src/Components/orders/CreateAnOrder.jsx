import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../Managers/orderManager";
import { PizzaForm } from "../pizza/PizzaForm";
import { GetEmployees } from "../../Managers/employeeManager";

export const CreateAnOrder = () => {
  const [order, setOrder] = useState({
    customerId: null,
    takenByEmployeeId: null,
    deliveredByEmployeeId: null,
    tableNumber: null,
    tipAmount: null,
    totalCost: null
  });
  const [employees, setEmployees] = useState();

  const navigate = useNavigate();


  const handleSaveOrder = (order) => {
    order.preventDefault();
    if (order) {
      const newOrder = {
        tableNumber: order.tableNumber,
        customerId: order.customerId,
        takenByEmployeeId: order.takenByEmployeeId,
        deliveredByEmployeeId: order.deliveredByEmployeeId,
        tipAmount: order.tipAmount,
        totalCost: order.totalCost,
      };
      CreateOrder(newOrder).then(() => {
        navigate("/orders")
      })
    }
  };

  useEffect(() => {
    GetEmployees().then(setEmployees)
  }, []);

  return (
    <>
      <div>
        <button>Add Pizza</button>
      </div>
      <PizzaForm></PizzaForm>

      <button onClick={handleSaveOrder}>Save Order</button>
      <button>Cancel Order</button>
    </>
  );
};
