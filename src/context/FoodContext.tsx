import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import api from "../api/axios"

export interface Food {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
  soldOut: boolean
}

interface FoodContextType {
  foods: Food[]
  fetchFoods: () => void
  deleteFood: (id: number) => void
  toggleAvailability: (id: number) => void
}

export const FoodContext = createContext({} as FoodContextType)

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([])

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods")
      setFoods(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const deleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)
    fetchFoods()
  }

  const toggleAvailability = async (id: number) => {
    await api.patch(`/foods/${id}/toggle`)
    fetchFoods()
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        fetchFoods,
        deleteFood,
        toggleAvailability,
      }}
    >
      {children}
    </FoodContext.Provider>
  )
}