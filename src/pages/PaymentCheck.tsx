import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const PaymentCheck = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState(
    "Vérification du paiement..."
  );

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      try {
        const response = await api.get(
          `/payment/status/${orderId}`
        );

        console.log(response.data);

        if (
          response.data.status === "paid"
        ) {
          clearInterval(interval);

          localStorage.removeItem("cart");

          navigate("/payment/success");
        }

        if (
          response.data.status === "failed"
        ) {
          clearInterval(interval);

          navigate("/payment/error");
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[500px]">

        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-orange-500 mx-auto"></div>

        <h1 className="text-3xl font-bold mt-8">
          Vérification du paiement...
        </h1>

        <p className="text-gray-500 mt-4">
          {message}
        </p>

      </div>

    </div>
  );
};

export default PaymentCheck;