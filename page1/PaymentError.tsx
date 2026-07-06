import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center w-[500px]">

        <FaTimesCircle
          className="text-red-500 mx-auto"
          size={90}
        />

        <h1 className="text-4xl font-bold mt-6">
          Paiement annulé
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Votre paiement n'a pas pu être effectué.
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl w-full font-bold"
        >
          Retour au panier
        </button>

      </div>

    </div>
  );
};

export default PaymentError;