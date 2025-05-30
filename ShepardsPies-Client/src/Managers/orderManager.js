const apiUrl = "/api/order"

export const GetOrders = () => {
fetch(apiUrl).then((res) => 
    res.json()
);
};