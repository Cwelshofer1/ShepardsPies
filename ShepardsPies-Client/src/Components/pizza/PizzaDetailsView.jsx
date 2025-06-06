import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePizza, getPizzas } from "../../Managers/pizzaManager";


export const PizzaDetailsView = () => {
    const [allPizzas, setAllPizzas] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getPizzas().then(setAllPizzas)
    },[]);

      const handlePizzaDelete = (pizza) => {
        deletePizza(pizza).then(() => {
          getPizzas().then(setAllPizzas)
        })};

    const handlePizzaNavigate = (pizzaId) => {
        navigate(`/pizzaupdateview/${pizzaId}`)
    }


    return(
        <>
        <h2>Pizza Details View</h2>
        {allPizzas.map((pizza) => (
            <React.Fragment key={pizza.id}>
        <h3 key={pizza.orderId}>Pizza Order Id: {pizza.orderId}</h3>
        <div>Pizza Size: {pizza.pizzaSize.name}</div>
        <div>Pizza Cheese: {pizza.pizzaCheese.name}</div>
        <div>Pizza Sauce: {pizza.pizzaSauce.name}</div>
        {pizza.pizzaToppings.map((pt) => (
                <li key={pt.id}>{pt.topping.name}</li>
              ))}
        <div><strong>Total Pizza Price:</strong> ${pizza.totalPizzaPrice.toFixed(2)}</div>
         <button
            onClick={() => handlePizzaDelete(pizza.id)}>
            Delete Pizza</button>
            <button
            onClick={() => handlePizzaNavigate(pizza.id)}
            >Update Pizza</button>
        <div></div>
        </React.Fragment>
        
        )) }
        
        <div></div>
        </>



    )

}