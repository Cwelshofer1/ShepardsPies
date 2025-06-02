import { useState, useEffect } from "react";
import {
  getCheeseTypes,
  getPizzaSizes,
  getSauceTypes,
  getToppings
} from "../../Managers/pizzaManager";


export const PizzaForm = () => {
    const [sizes, setSizes] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [selectedSizeId, setSelectedSizeId] = useState("");
    const [selectedSauceId, setSelectedSauceId] = useState("");
    const [selectedCheeseId, setSelectedCheeseId] = useState("");
    const [selectedToppingId, setSelectedToppingId] = useState("");


    useEffect(() => {
      getPizzaSizes().then(setSizes);
      getSauceTypes().then(setSauces);
      getCheeseTypes().then(setCheeses);
      getToppings().then(setToppings);
    })


    return (
      <>
      <div>
        <h3>
          Build Pizza
        </h3>

        <div>
          <label>Pizza Size:</label>
          <select
          value={selectedSizeId}
          onChange={((e) => setSelectedSizeId(e.target.value))}
          >
            <option value="">-- Select Size --</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            )
          )}
          </select>
        </div>
      </div>
      </>
    )
}