

import ReactDOM from "react-dom/client"

import "./index.css"

import App from "./App"
import {
  FoodProvider,
} from "./context/FoodContext"

import {
  OrderProvider,
} from "./context/OrderContext"

import {
  CartProvider,
} from "./context/CartContext"

import {
  AuthProvider,
} from "./context/AuthContext"

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )!
).render(
  

  <AuthProvider>

  <FoodProvider>

    <OrderProvider>

      <CartProvider>

        <App />

      </CartProvider>

    </OrderProvider>

  </FoodProvider>

</AuthProvider>
)