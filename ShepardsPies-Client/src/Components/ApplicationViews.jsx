import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import { ViewOrders } from "./orders/ViewOrders";
import { CreateAnOrder } from "./orders/CreateAnOrder";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { OrderDetails } from "./orders/OrderDetails";
import { PizzaForm } from "./pizza/PizzaForm"


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (

    <Routes>

      <Route path="/">
        <Route index path="orders" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <ViewOrders />
        </AuthorizedRoute>}></Route>

        <Route path="createorder" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <CreateAnOrder />
        </AuthorizedRoute>}></Route>

        <Route path="pizzaform/:orderId" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <PizzaForm />
        </AuthorizedRoute>}></Route>

        <Route path="orderdetails" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <OrderDetails />
        </AuthorizedRoute>}></Route>

         <Route path="pizzaform" element={<AuthorizedRoute loggedInUser={loggedInUser}>
          <PizzaForm />
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
