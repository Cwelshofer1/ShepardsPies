import { useState, useEffect } from "react";
import { CreateOrder } from "../../Managers/orderManager";
import { PizzaForm } from "../pizza/PizzaForm";

export const CreateAnOrder = () => {
  const [order, setOrder] = useState({
    customerId: "",
    takenByEmployeeId: "",
    deliveredByEmployeeId: "",
    tableNumber: "",
    tipAmount: "",
    totalCost: "",
  });


  
  useEffect(() => {})

  return (
    <>
    <div>
      <button>Add Pizza</button>
    </div>
    <PizzaForm></PizzaForm>
    </>



  )
  
};
