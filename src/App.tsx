import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { Toaster } from "react-hot-toast"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"

import AdminLogin from "./pages/AdminLogin"
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import PaymentCheck from "./pages/PaymentCheck";

import AdminLayout from "./admin/layouts/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";

import Orders from "./admin/pages/Orders";

import Foods from "./admin/pages/Foods";

import Users from "./admin/pages/Users";

import Revenue from "./admin/pages/Revenue";

import Settings from "./admin/pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Toaster />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
  path="/payment/check/:orderId"
  element={<PaymentCheck />}
/>

        <Route
    path="/payment/success"
    element={<PaymentSuccess />}
/>
      <Route
  path="/payment/error"
  element={<PaymentError />}
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        

        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
path="/admin"
element={<AdminLayout />}
>

<Route
index
element={<Dashboard />}
/>

<Route
path="dashboard"
element={<Dashboard />}
/>

<Route
path="orders"
element={<Orders />}
/>

<Route
path="foods"
element={<Foods />}
/>

<Route
path="users"
element={<Users />}
/>

<Route
path="revenue"
element={<Revenue />}
/>

<Route
path="settings"
element={<Settings />}
/>

</Route>

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App