import {
  useContext,
} from "react"

import {
  FoodContext,
} from "../context/FoodContext"

import {
  CartContext,
} from "../context/CartContext"

const Home = () => {

  const {
    foods,
  } = useContext(FoodContext)

  const {
    addToCart,
  } = useContext(CartContext)

  return (

    <div className="min-h-screen bg-orange-50">

      {/* HERO SECTION */}

      <div className="relative h-[500px]">

        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="food"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">

            Commandez vos plats préférés

          </h1>

          <p className="text-white text-xl md:text-2xl max-w-3xl">

            Découvrez les meilleurs burgers, pizzas,
            tacos et repas délicieux livrés
            rapidement chez vous.

          </p>

          <button
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-xl font-bold transition"
          >

            Commander maintenant

          </button>

        </div>

      </div>

      {/* SECTION PLATS */}

      <div className="p-8">

        <h2 className="text-4xl font-bold text-center mb-12">

          Nos Plats

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {foods.map((food: Food) => (

            <div
              key={food.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              {/* IMAGE */}

              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-52 object-cover"
              />

              {/* CONTENT */}

              <div className="p-6">

                <h2 className="text-2xl font-bold">

                  {food.name}

                </h2>

                <p className="text-gray-500 mt-2">

                  {food.description}

                </p>

                <h3 className="text-orange-500 text-2xl font-bold mt-4">

                  {food.price} FCFA

                </h3>

                <div className="mt-6">

                  {food.soldOut ? (

                    <button
                      disabled
                      className="bg-red-500 text-white px-5 py-3 rounded-xl w-full"
                    >

                      Épuisé

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        addToCart(food)
                      }

                      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl w-full transition"
                    >

                      Ajouter au panier

                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Home