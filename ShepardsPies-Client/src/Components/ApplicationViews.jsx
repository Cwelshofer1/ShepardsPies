import { ViewAllOrders } from "./orders/ViewAllOrders";
import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { CreateAnOrder } from "./orders/CreateAnOrder";
import Register from "./auth/Register";
import Login from "./auth/Login";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (

    <Routes>

      <Route path="/">
        <Route index path="orders" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <ViewAllOrders />
        </AuthorizedRoute>}></Route>

        <Route index path="createorder" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <CreateAnOrder />
        </AuthorizedRoute>}></Route>

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

  );
}
