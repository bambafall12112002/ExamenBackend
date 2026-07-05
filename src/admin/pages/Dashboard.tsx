import {
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
  FaUtensils,
  FaArrowUp,
  FaClock,
} from "react-icons/fa";

import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { FoodContext } from "../../context/FoodContext";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import SalesChart from "../components/SalesChart";

const Dashboard = () => {
  const { orders } = useContext(OrderContext);
  const { foods } = useContext(FoodContext);

  const revenue = orders.reduce(
    (acc, order) => acc + order.total,
    0
  );

  const paidOrders = orders.filter(
    (o) =>
      o.status === "paid" ||
      o.transactionStatus === "success"
  );

  const [chart,setChart]=useState([]);

useEffect(()=>{

fetchChart();

},[]);

const fetchChart=async()=>{

const res=await api.get(

"/orders/stats/chart"

);

setChart(res.data);

}



  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  );

  return (

   
    <div>

      {/* TITRE */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Tableau de bord
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenue dans votre espace administrateur
        </p>

      </div>

      {/* STATISTIQUES */}

      <div className="grid lg:grid-cols-4 gap-6">
        <SalesChart data={chart} />

        {/* Commandes */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Commandes
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {orders.length}
              </h2>

            </div>

            <FaClipboardList
              className="text-orange-500"
              size={45}
            />

          </div>

          <div className="flex items-center gap-2 mt-6 text-green-500">

            <FaArrowUp />

            <span>
              +12%
            </span>

          </div>

        </div>

        {/* Revenus */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Revenus
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {revenue} FCFA
              </h2>

            </div>

            <FaMoneyBillWave
              className="text-green-500"
              size={45}
            />

          </div>

        </div>

        {/* Clients */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Clients
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  new Set(
                    orders.map(
                      (o) => o.userId
                    )
                  ).size
                }
              </h2>

            </div>

            <FaUsers
              className="text-blue-500"
              size={45}
            />

          </div>

        </div>

        {/* Plats */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Plats
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {foods.length}
              </h2>

            </div>

            <FaUtensils
              className="text-red-500"
              size={45}
            />

          </div>

        </div>

      </div>

      {/* COMMANDES */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Paiements */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">

            Paiements

          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>

                Paiements réussis

              </span>

              <span className="text-green-600 font-bold">

                {paidOrders.length}

              </span>

            </div>

            <div className="flex justify-between">

              <span>

                Paiements en attente

              </span>

              <span className="text-orange-500 font-bold">

                {pendingOrders.length}

              </span>

            </div>

          </div>

        </div>

        {/* Activités */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">

            Activités récentes

          </h2>

          <div className="space-y-5">

            {orders
              .slice(-5)
              .reverse()
              .map((order) => (

                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-3">

                    <FaClock className="text-orange-500" />

                    <div>

                      <p className="font-semibold">

                        Commande #{order.id}

                      </p>

                      <p className="text-sm text-gray-500">

                        {order.total} FCFA

                      </p>

                    </div>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >

                    {order.status}

                  </span>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;