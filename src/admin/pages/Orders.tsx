import { useContext, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";

import { OrderContext } from "../../context/OrderContext";
import OrderModal from "../components/OrderModal";

const Orders = () => {
  const { orders } = useContext(OrderContext);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("Tous");

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const searchMatch =
        order.customerName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.phone?.includes(search) ||
        String(order.id).includes(search);

      const statusMatch =
        statusFilter === "Tous" ||
        order.orderStatus === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Gestion des commandes
        </h1>

        <span className="bg-orange-500 text-white px-5 py-3 rounded-xl">
          {orders.length} commandes
        </span>

      </div>

      {/* RECHERCHE */}

      <div className="flex justify-between gap-4 mb-8">

        <input
          type="text"
          placeholder="Rechercher une commande..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-xl w-96"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-xl"
        >
          <option>Tous</option>
          <option>En attente</option>
          <option>Acceptée</option>
          <option>Préparation</option>
          <option>En livraison</option>
          <option>Livrée</option>
          <option>Annulée</option>
        </select>

      </div>

      {/* TABLEAU */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-4">#</th>

              <th>Client</th>

              <th>Téléphone</th>

              <th>Total</th>

              <th>Paiement</th>

              <th>Statut paiement</th>

              <th>Commande</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {displayedOrders.length > 0 ? (

              displayedOrders.map((order: any) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-orange-50"
                >

                  <td className="p-4">
                    #{order.id}
                  </td>

                  <td>{order.customerName}</td>

                  <td>{order.phone}</td>

                  <td className="font-bold">
                    {order.total} FCFA
                  </td>

                  <td>{order.paymentMethod}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.transactionStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >

                      {order.transactionStatus}

                    </span>

                  </td>

                  <td>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                      {order.orderStatus}

                    </span>

                  </td>

                  <td>

                    {new Date(order.createdAt).toLocaleString()}

                  </td>

                  <td>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-black hover:bg-gray-800 text-white p-3 rounded-lg"
                    >

                      <FaEye />

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={9}
                  className="text-center py-10 text-gray-500"
                >

                  Aucune commande trouvée

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center mt-8 gap-4">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="bg-orange-500 text-white px-5 py-2 rounded-xl disabled:bg-gray-300"
        >

          Précédent

        </button>

        <span className="flex items-center font-bold">

          Page {currentPage} / {totalPages || 1}

        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="bg-orange-500 text-white px-5 py-2 rounded-xl disabled:bg-gray-300"
        >

          Suivant

        </button>

      </div>

      {/* MODAL */}

      {selectedOrder && (

        <OrderModal
          order={selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
        />

      )}

    </div>
  );
};

export default Orders;