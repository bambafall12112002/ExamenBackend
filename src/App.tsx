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
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

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
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin/dashboard"
  element={<Admin />}
/>

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App