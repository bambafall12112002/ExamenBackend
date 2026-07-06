import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api/axios";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // ===============================
  // PAIEMENT NABOOPAY
  // ===============================
  const handleCheckout = async (
    paymentMethod: string
  ) => {
    if (cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    if (!user) {
      toast.error("Veuillez vous connecter");
      navigate("/login");
      return;
    }

    try {
      console.log("USER =", user);
console.log("PHONE =", user.telephone);
      const response = 
   await api.post("/payment/create",{

userId:user.id,

customerName: user.telephone,

phone:user.telephone,

amount:total,

paymentMethod,

cart

});


      if (!response.data.checkout_url) {
        toast.error(
          "Impossible de créer le paiement."
        );
        return;
      }

      // Sauvegarder la commande
     localStorage.setItem(
  "cart",
  JSON.stringify(cart)
);

localStorage.setItem(
  "nabooOrderId",
  response.data.order_id
);

      localStorage.setItem(
        "userId",
        String(user.id)
      );

      localStorage.setItem(
        "paymentMethod",
        paymentMethod
      );

      // Redirection NabooPay
      window.location.href =
        response.data.checkout_url;
    } catch (error) {
      console.log(error);

      toast.error(
        "Erreur lors de la création du paiement."
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <FaShoppingCart
            className="text-orange-500"
            size={35}
          />

          <h1 className="text-4xl font-bold">
            Mon Panier
          </h1>
        </div>
                {/* PANIER VIDE */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              Votre panier est vide
            </h2>

            <p className="mt-4 text-gray-500">
              Ajoutez des plats avant de commander
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl"
            >
              Voir les plats
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LISTE DES PLATS */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden"
                >

                  {/* IMAGE */}
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/300x300?text=Food"
                    }
                    alt={item.name}
                    className="w-full md:w-52 h-52 object-cover"
                  />

                  {/* INFOS */}
                  <div className="flex-1 p-6">

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                    {/* Quantité */}
                    <div className="flex items-center gap-4 mt-6">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        <FaMinus />
                      </button>

                      <span className="text-xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
                      >
                        <FaPlus />
                      </button>

                    </div>

                    {/* Prix */}
                    <h3 className="text-xl font-bold text-orange-500 mt-5">
                      {item.price * item.quantity} FCFA
                    </h3>

                    {/* Supprimer */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="mt-5 text-red-500 hover:text-red-700 flex items-center gap-2"
                    >
                      <FaTrash />
                      Supprimer
                    </button>

                  </div>

                </div>

              ))}

            </div>
                        {/* RESUME */}
            <div className="bg-white p-6 rounded-3xl shadow-lg h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Résumé
              </h2>

              <div className="flex justify-between mb-3">
                <span>Articles</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between mb-6">
                <span>Total</span>

                <span className="text-orange-500 font-bold text-xl">
                  {total} FCFA
                </span>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
              >
                Valider la commande
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-300 hover:bg-gray-400 py-4 rounded-xl mt-3"
              >
                Vider le panier
              </button>

            </div>

          </div>
        )}

        {/* MODAL PAIEMENT */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-[420px] shadow-2xl">

              <h2 className="text-3xl font-bold text-center mb-8">
                Choisissez votre moyen de paiement
              </h2>

              <button
                onClick={() => handleCheckout("Wave")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg mb-4"
              >
                💙 Payer avec Wave
              </button>

              <button
                onClick={() => handleCheckout("Orange_Money")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg mb-4"
              >
                🟠 Payer avec Orange Money
              </button>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 py-4 rounded-xl"
              >
                Annuler
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;