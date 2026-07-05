import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import api from "../api/axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(
    "Vérification du paiement..."
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = localStorage.getItem("nabooOrderId");

    if (!orderId) {
      setLoading(false);
      setStatus("Commande introuvable.");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await api.get(
          `/payment/status/${orderId}`
        );

        console.log(res.data);

        if (res.data.status === "paid") {
          clearInterval(interval);

          setLoading(false);

          setStatus("Paiement confirmé ✅");

          localStorage.removeItem("cart");
          localStorage.removeItem("nabooOrderId");
          localStorage.removeItem("paymentMethod");
        } else {
          setStatus(
            "Paiement en cours de confirmation..."
          );
        }
      } catch (err) {
        console.log(err);

        setStatus("Erreur de vérification.");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[500px] text-center">

        <FaCheckCircle
          size={90}
          className="mx-auto text-green-500"
        />

        <h1 className="text-4xl font-bold mt-6">
          Paiement
        </h1>

        {loading ? (
          <>

            <div className="mt-8">

              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>

            </div>

            <p className="mt-6 text-lg font-semibold">
              {status}
            </p>

            <p className="text-gray-500 mt-3">
              Veuillez patienter...
            </p>

          </>
        ) : (
          <>

            <p className="mt-8 text-2xl text-green-600 font-bold">
              {status}
            </p>

            <p className="text-gray-500 mt-4">
              Merci pour votre commande 🍔
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl w-full font-bold"
            >
              Retour à l'accueil
            </button>

          </>
        )}

      </div>

    </div>
  );
};

export default PaymentSuccess;