const apiUrl = "/api/employee"

export const GetEmployees = () => {
  return fetch(apiUrl).then((res) => res.json());
};
