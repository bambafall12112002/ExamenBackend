import {
  createContext,
  useState,
  useEffect,
} from "react"

import type { ReactNode } from "react"
import type { Food } from "../types/food"

interface CartItem extends Food {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]

  addToCart: (food: Food) => void

  removeFromCart: (id: number) => void

  decreaseQuantity: (
    id: number
  ) => void

  clearCart: () => void
}

export const CartContext =
  createContext<CartContextType>(
    {} as CartContextType
  )

export const CartProvider = ({
  children,
}: {
  children: ReactNode
}) => {

  const [cart, setCart] = useState<CartItem[]>(
    () => {
      const saved =
        localStorage.getItem("cart")

      return saved
        ? JSON.parse(saved)
        : []
    }
  )

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

  }, [cart])

  // AJOUTER AU PANIER

  const addToCart = (food: Food) => {

    const existing = cart.find(
      (item) => item.id === food.id
    )

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ])
    }
  }

  // DIMINUER QUANTITÉ

  const decreaseQuantity = (
    id: number
  ) => {

    setCart(
      cart
        .map((item) =>

          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )

        .filter(
          (item) =>
            item.quantity > 0
        )
    )
  }

  // SUPPRIMER PRODUIT

  const removeFromCart = (
    id: number
  ) => {

    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    )
  }

  // VIDER PANIER

  const clearCart = () => {
    setCart([])
  }

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>
  )
}