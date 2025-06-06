// src/api/pizzaManager.js

const API_BASE = 'https://localhost:5001/api';

export const getPizzas = () => {
    return fetch(`${API_BASE}/pizza`)
    .then(res => res.json());
}

export const getPizzaSizes = () => {
  mode: 'no-cors'
  return fetch(`${API_BASE}/pizzasize`)
  
    .then(res => res.json());
};

export const getSauceTypes = () => {
  return fetch(`${API_BASE}/saucetype`)
    .then(res => res.json());
};

export const getCheeseTypes = () => {
  return fetch(`${API_BASE}/cheesetype`)
    .then(res => res.json());
};

export const getToppings = () => {
 return fetch(`${API_BASE}/topping`)
    .then(res => res.json());

};


export const createPizza = (pizzaDto) => {
  return fetch(`${API_BASE}/pizza`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pizzaDto)
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => Promise.reject(err));
    }
    return res.json();
  });
};

export const deletePizza = (pizza) => {
  return fetch(`${API_BASE}/pizza/${pizza}`,
    {
      method: "DELETE"
    }
  )
}

export const getPizzaById = (id) => {
  return fetch(`${API_BASE}/pizza/${id}`).then((res) => res.json());
};

export const updatePizza = (pizza) => {
  return fetch(`${API_BASE}/pizza/${pizza.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  });
};
