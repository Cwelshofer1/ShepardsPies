import { ViewAllOrders } from "./ViewAllOrders";
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Register from "./auth/Register";
import Login from "./auth/Login";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <>
    <Routes>
      <Route path="/orders" element= {<AuthorizedRoute loggedInUser={loggedInUser}>
              <ViewAllOrders />
            </AuthorizedRoute>}></Route>
      <Route path="/">
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
      
    </Routes>
    </>
  );
}
