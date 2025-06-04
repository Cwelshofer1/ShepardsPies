const apiUrl = "/api/customer";

export const GetCustomers = () => {
    return fetch(apiUrl).then((res) => res.json());
};