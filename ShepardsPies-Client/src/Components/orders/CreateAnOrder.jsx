import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../Managers/orderManager";
import { PizzaForm } from "../pizza/PizzaForm";
import { GetEmployees } from "../../Managers/employeeManager";

export const CreateAnOrder = () => {
  const [order, setOrder] = useState({
    customerId: "",
    takenByEmployeeId: "",
    deliveredByEmployeeId: "",
    tableNumber: "",
    tipAmount: "",
    totalCost: "",
  });
  const [employees, setEmployees] = useState();

  const navigate = useNavigate();


  const handleSaveOrder = (order) => {
    order.preventdefault();
    if (order) {
      const newOrder = {
        customerId: order.customerId,
        takenByEmployeeId: order.takenByEmployeeId,
        deliveredByEmployeeId: order.deliveredByEmployeeId,
        tableNumber: order.tableNumber,
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
