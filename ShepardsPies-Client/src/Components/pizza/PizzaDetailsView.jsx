import { useState, useEffect } from "react";

import { getPizzas } from "../../Managers/pizzaManager";

export const PizzaDetailsView = () => {
    


    const [allPizzas, setAllPizzas] = useState([]);

    useEffect(() => {
        getPizzas().then(setAllPizzas)
    },[])


    return(
        <>
        <h2>Pizza Details View</h2>
        {allPizzas.map((pizza) => (
            <>
        <h3 key={pizza.orderId}>Pizza Order Id: {pizza.orderId}</h3>
        <div>Pizza Size: {pizza.pizzaSize.name}</div>
        <div>Pizza Cheese: {pizza.pizzaCheese.name}</div>
        <div>Pizza Sauce: {pizza.pizzaSauce.name}</div>
        {pizza.pizzaToppings.map((pt) => (
                <li key={pt.id}>{pt.topping.name}</li>
              ))}
        <div><strong>Total Pizza Price:</strong> ${pizza.totalPizzaPrice.toFixed(2)}</div>
        <div></div>
        </>
        
        )) }
        
        <div></div>
        </>



    )

}