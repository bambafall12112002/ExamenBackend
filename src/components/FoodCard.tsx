import type { Food } from "../types/food"

import { useContext } from "react"

import { CartContext } from "../context/CartContext"

import { motion } from "framer-motion"

import toast from "react-hot-toast"

const FoodCard = ({
  food,
}: {
  food: Food
}) => {

  const { addToCart } =
    useContext(CartContext)

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >

      <img
        src={food.image}
        alt={food.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {food.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {food.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <span className="font-bold text-orange-500">
            {food.price} FCFA
          </span>

          {food.available ? (

            <button
              onClick={() => {
                addToCart(food)

                toast.success(
                  "Plat ajouté au panier"
                )
              }}

              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Ajouter
            </button>

          ) : (

            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              SOLD OUT
            </button>

          )}

        </div>

      </div>

    </motion.div>
  )
}

export default FoodCard