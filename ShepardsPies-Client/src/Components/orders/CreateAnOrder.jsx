import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../Managers/orderManager";
import { PizzaForm } from "../pizza/PizzaForm";
import { GetEmployees } from "../../Managers/employeeManager";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    GetEmployees().then(setEmployees)
  }, []);




  return (
    <>
      <div>
      </div>
      <PizzaForm></PizzaForm>
      <button>Cancel Order</button>
    </>
  );
};
