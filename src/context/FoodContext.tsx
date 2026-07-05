import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const FoodContext = createContext({} as any);

export const FoodProvider = ({ children }: any) => {
  const [foods, setFoods] = useState([]);

  // Charger les plats
  const fetchFoods = async () => {
    const res = await api.get("/foods");
    setFoods(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Ajouter
  const addFood = async (food: any) => {
    await api.post("/foods", food);
    fetchFoods();
  };

  // Modifier
  const updateFood = async (
    id: number,
    food: any
  ) => {
    await api.put(`/foods/${id}`, food);
    fetchFoods();
  };

  // Supprimer
  const deleteFood = async (
    id: number
  ) => {
    await api.delete(`/foods/${id}`);
    fetchFoods();
  };

  // Disponible / Indisponible
  const toggleFood = async (
    id: number
  ) => {
    await api.patch(`/foods/${id}/toggle`);
    fetchFoods();
  };

  return (
  <FoodContext.Provider
    value={{
      foods,
      fetchFoods,
      addFood,
      updateFood,
      deleteFood,
      toggleFood,
    }}
  >
    {children}
  </FoodContext.Provider>
);
};

export default FoodProvider;