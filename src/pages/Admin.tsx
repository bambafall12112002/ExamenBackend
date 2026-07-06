import {
  useContext,
  useEffect,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import api from "../api/axios"

import {
  FoodContext,
} from "../context/FoodContext"

import {
  OrderContext,
} from "../context/OrderContext"

const Admin = () => {

  const navigate =
    useNavigate()

  const {
    foods,
    fetchFoods,
    deleteFood,
    toggleAvailability,
  } = useContext(FoodContext)

  const { orders } =
    useContext(OrderContext)

  const [name, setName] =
    useState("")

  const [price, setPrice] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [preview,
    setPreview] =
    useState("")

  // ADMIN SECURITY

  useEffect(() => {

    const admin =
      localStorage.getItem(
        "admin"
      )

    if (!admin) {

      navigate(
        "/admin/login"
      )
    }

  }, [])

  // IMAGE

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0]

    if (file) {

      const reader =
        new FileReader()

      reader.onloadend = () => {

        setPreview(
          reader.result as string
        )
      }

      reader.readAsDataURL(file)
    }
  }

  // ADD FOOD

  const handleAddFood =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      try {

        await api.post(
          "/foods",
          {
            name,

            price:
              Number(price),

            imageUrl:
              preview,

            description,
          }
        )

        alert("Plat ajouté")

        setName("")
        setPrice("")
        setDescription("")
        setPreview("")

        fetchFoods()

      } catch (error) {

        console.log(error)

        alert(
          "Erreur ajout plat"
        )
      }
    }

  // REVENUS

  const totalRevenue =
    orders.reduce(
      (acc: number, order: any) =>
        acc + order.total,
      0
    )

  return (

    <div className="min-h-screen bg-orange-50 p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">

            Dashboard Admin

          </h1>
            <button
  onClick={() => {

    localStorage.removeItem("admin");

    localStorage.removeItem("cart"); // 🔥 vide panier

    navigate("/admin/login");
  }}

  className="bg-red-500 text-white px-6 py-3 rounded-xl"
>

  Déconnexion

</button>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-orange-500 text-white p-8 rounded-3xl">

            <h2 className="text-4xl font-bold">

              {orders.length}

            </h2>

            <p>Commandes</p>

          </div>

          <div className="bg-green-500 text-white p-8 rounded-3xl">

            <h2 className="text-4xl font-bold">

              {totalRevenue} FCFA

            </h2>

            <p>Revenus</p>

          </div>

          <div className="bg-red-500 text-white p-8 rounded-3xl">

            <h2 className="text-4xl font-bold">

              {foods.length}

            </h2>

            <p>Plats</p>

          </div>

        </div>

        {/* ADD FOOD */}

        <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">

          <h2 className="text-3xl font-bold mb-6">

            Ajouter un plat

          </h2>

          <form
            onSubmit={
              handleAddFood
            }

            className="grid md:grid-cols-2 gap-4"
          >

            <input
              placeholder="Nom"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Prix"

              value={price}

              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }

              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Description"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              className="border p-3 rounded-xl"
            />

            {/* IMAGE */}

            <div>

              <input
                type="file"
                accept="image/*"

                onChange={
                  handleImageChange
                }

                className="border p-3 rounded-xl w-full"
              />

              {preview && (

                <img
                  src={preview}
                  className="w-32 h-32 object-cover rounded-xl mt-4"
                />

              )}

            </div>

            <button
              className="bg-orange-500 text-white p-3 rounded-xl col-span-full"
            >

              Ajouter

            </button>

          </form>

        </div>

        {/* FOODS */}

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">

            Gestion des plats

          </h2>

          <div className="space-y-6">

            {foods.map((food: any) => (

              <div
                key={food.id}
                className="flex justify-between items-center border-b pb-4"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={food.imageUrl}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>

                    <h3 className="text-2xl font-bold">

                      {food.name}

                    </h3>

                    <p>

                      {food.price} FCFA

                    </p>

                    <p className="text-gray-500">

                      {food.description}

                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      toggleAvailability(
                        food.id
                      )
                    }

                    className={`px-4 py-2 rounded-xl text-white ${
                      food.soldOut
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >

                    {food.soldOut
                      ? "Disponible"
                      : "SOLD OUT"}

                  </button>

                  <button
                    onClick={() =>
                      deleteFood(
                        food.id
                      )
                    }

                    className="bg-black text-white px-4 py-2 rounded-xl"
                  >

                    Supprimer

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Admin