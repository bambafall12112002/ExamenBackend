import { useContext, useState } from "react";
import { FoodContext } from "../../context/FoodContext";

const Foods = () => {
  const {
    foods,
    addFood,
    updateFood,
    deleteFood,
    toggleFood,
  } = useContext(FoodContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  const [editing, setEditing] = useState<any>(null);

  const submit = async () => {
    if (
      form.name === "" ||
      form.price === "" ||
      form.imageUrl === ""
    )
      return;

    if (editing) {
      await updateFood(editing.id, {
        ...form,
        price: Number(form.price),
      });

      setEditing(null);
    } else {
      await addFood({
        ...form,
        price: Number(form.price),
      });
    }

    setForm({
      name: "",
      price: "",
      imageUrl: "",
    });
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Gestion des plats
      </h1>

      {/* Formulaire */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            className="border rounded-lg p-3"
            placeholder="Nom du plat"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Prix"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                imageUrl: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={submit}
          className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          {editing
            ? "Modifier"
            : "Ajouter"}
        </button>

      </div>

      {/* Tableau */}

      <table className="w-full bg-white shadow rounded-xl">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>

            <th>Nom</th>

            <th>Prix</th>

            <th>Disponibilité</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {foods.map((food: any) => (

            <tr
              key={food.id}
              className="border-t text-center"
            >

              <td className="p-3">

                <img
                  src={food.imageUrl}
                  className="w-20 h-20 object-cover rounded"
                />

              </td>

              <td>{food.name}</td>

              <td>{food.price} FCFA</td>

              <td>

                <button
                  onClick={() =>
                    toggleFood(food.id)
                  }
                  className={`px-4 py-2 rounded text-white ${
                    food.soldOut
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >

                  {food.soldOut
                    ? "Indisponible"
                    : "Disponible"}

                </button>

              </td>

              <td className="space-x-3">

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setEditing(food);

                    setForm({
                      name: food.name,
                      price: String(food.price),
                      imageUrl:
                        food.imageUrl,
                    });
                  }}
                >
                  Modifier
                </button>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    deleteFood(food.id)
                  }
                >
                  Supprimer
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Foods;