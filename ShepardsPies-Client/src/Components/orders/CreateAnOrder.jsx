import { useState, useEffect } from "react";
import { CreateOrder } from "../../Managers/orderManager";

export const CreateAnOrder = () => {
  const [order, setOrder] = useState({
    customerId: "",
    takenByEmployeeId: "",
    deliveredByEmployeeId: "",
    tableNumber: "",
    tipAmount: "",
    totalCost: "",
  });

  
};
