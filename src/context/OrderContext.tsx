import { createContext, useState, useEffect } from "react"
import api from "../api/axios"

export const OrderContext = createContext({} as any)

export const OrderProvider = ({ children }: any) => {
  const [orders, setOrders] = useState([])

  // charger commandes depuis backend
  const fetchOrders = async () => {
    const res = await api.get("/orders")
    setOrders(res.data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // ENVOYER EN BASE
  const addOrder = async (order: any) => {
    await api.post("/orders", order)
    fetchOrders()
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  )
}