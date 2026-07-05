import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const OrderModal = ({
  order,
  onClose,
}: any) => {

  const [status, setStatus] = useState(
    order.orderStatus
  );

  const updateStatus = async () => {
    try {

      await api.patch(
        `/orders/${order.id}/status`,
        {
          orderStatus: status,
        }
      );

      toast.success(
        "Commande mise à jour"
      );

      order.orderStatus = status;

    } catch (error) {

      toast.error(
        "Erreur lors de la mise à jour"
      );

      console.log(error);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] p-8 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">

            Commande #{order.id}

          </h2>

          <button onClick={onClose}>

            <FaTimes size={24} />

          </button>

        </div>

        {/* INFOS */}

        <div className="space-y-3">

          <p>
            <strong>Client :</strong> {order.customerName}
          </p>

          <p>
            <strong>Téléphone :</strong> {order.phone}
          </p>

          <p>
            <strong>Total :</strong> {order.total} FCFA
          </p>

          <p>
            <strong>Paiement :</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Statut paiement :</strong> {order.transactionStatus}
          </p>

          <p>
            <strong>Statut commande :</strong> {order.orderStatus}
          </p>

        </div>

        <hr className="my-6" />

        {/* PRODUITS */}

        <h3 className="text-2xl font-bold mb-4">

          Produits commandés

        </h3>

        <div className="space-y-3">

          {order.items?.map((item: any, index: number) => (

            <div
              key={index}
              className="flex justify-between bg-gray-100 p-4 rounded-xl"
            >

              <span>

                {item.name}

              </span>

              <span>

                x{item.quantity}

              </span>

              <span>

                {item.price} FCFA

              </span>

            </div>

          ))}

        </div>

        {/* CHANGER LE STATUT */}

        <div className="mt-8">

          <label className="font-bold">

            Statut de la commande

          </label>

          <select

            value={status}

            onChange={(e) =>
              setStatus(e.target.value)
            }

            className="border p-3 rounded-xl w-full mt-3"

          >

            <option>En attente</option>

            <option>Acceptée</option>

            <option>Préparation</option>

            <option>En livraison</option>

            <option>Livrée</option>

            <option>Annulée</option>

          </select>

          <button

            onClick={updateStatus}

            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl w-full"

          >

            Enregistrer

          </button>

        </div>

      </div>

    </div>

  );
};

export default OrderModal;