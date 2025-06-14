import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateOrderCost } from "../../Managers/orderManager";
import { getPizzaById } from "../../Managers/pizzaManager";
import { updatePizza } from "../../Managers/pizzaManager";
import {
    createPizza,
    getCheeseTypes,
    getPizzaSizes,
    getSauceTypes,
    getToppings
} from "../../Managers/pizzaManager";



export const UpdatePizza = () => {
    const [sizes, setSizes] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [selectedSizeId, setSelectedSizeId] = useState("");
    const [selectedSauceId, setSelectedSauceId] = useState("");
    const [selectedCheeseId, setSelectedCheeseId] = useState("");

    const [selectedToppingIds, setSelectedToppingIds] = useState([]);



    const navigate = useNavigate();



    useEffect(() => {
        getPizzaSizes().then(setSizes);
        getSauceTypes().then(setSauces);
        getCheeseTypes().then(setCheeses);
        getToppings().then(setToppings);
    }, [])


    const { pizzaId } = useParams();
    const parsePizzaId = parseInt(pizzaId);

    useEffect(() => {
        if (pizzaId) {
            getPizzaById(pizzaId).then((pizza) => {
                setSelectedSizeId(pizza.pizzaSizeId);
                setSelectedSauceId(pizza.pizzaSauceId);
                setSelectedCheeseId(pizza.pizzaCheeseId);

                // This assumes the toppings come in like: pizza.toppings: [{id: 1, name: "Pepperoni"}, ...]
                const toppingIds = pizza.pizzaToppings?.map((pt) => pt.topping.id) || [];
                setSelectedToppingIds(toppingIds);
            });
        }
    }, [pizzaId]);

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value); // Convert value to integer if IDs are numbers
        const isChecked = event.target.checked;

        if (isChecked) {

            setSelectedToppingIds((prevSelected) => [...prevSelected, toppingId]);
        } else {

            setSelectedToppingIds((prevSelected) =>
                prevSelected.filter((id) => id !== toppingId)
            );
        }
    };



    const handleAddPizza = (pizza) => {
        pizza.preventDefault();
        if (pizza) {
            const newPizza = {
                id: parseInt(pizzaId),
                orderId: parsePizzaId,
                pizzaSizeId: selectedSizeId,
                pizzaCheeseId: selectedCheeseId,
                pizzaSauceId: selectedSauceId,
                ToppingIds: selectedToppingIds,

            };
            updatePizza(newPizza).then(() => {
                navigate("/orderdetails");
                updateOrderCost(parseOrderId).then((response) => {
                    console.log("New Total:", response.totalCost);

                });

            })
        }
    };



    return (
        <>
            <div>
                <h3>
                    Build Pizza
                </h3>
                <h2>Pizza Number: {pizzaId} </h2>

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

                    <label>Pizza Sauce:</label>
                    <select
                        value={selectedSauceId}
                        onChange={((e) => setSelectedSauceId(e.target.value))}
                    >
                        <option value="">-- Select Sauce --</option>
                        {sauces.map((sauce) => (
                            <option key={sauce.id} value={sauce.id}>
                                {sauce.name}
                            </option>
                        )
                        )}
                    </select>

                    <label>Pizza Cheese:</label>
                    <select
                        value={selectedCheeseId}
                        onChange={((e) => setSelectedCheeseId(e.target.value))}
                    >
                        <option value="">-- Select Cheese --</option>
                        {cheeses.map((cheese) => (
                            <option key={cheese.id} value={cheese.id}>
                                {cheese.name}
                            </option>
                        )
                        )}
                    </select>

                    {toppings.map((topping) => (
                        <label key={topping.id}>
                            <input
                                type="checkbox"
                                value={topping.id}
                                checked={selectedToppingIds.includes(topping.id)}
                                onChange={handleToppingChange}
                            />
                            {topping.name}

                        </label>
                    ))}

                </div>
                <button onClick={handleAddPizza}>Update Pizza</button>
            </div>
        </>
    )
}