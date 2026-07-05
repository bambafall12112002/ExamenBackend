import { useEffect, useState } from "react";
import api from "../../api/axios";

const Revenue = () => {

    const [stats,setStats]=useState<any>({});

    useEffect(()=>{

        fetchStats();

    },[]);

    const fetchStats=async()=>{

        const res=await api.get(
            "/orders/stats/revenue"
        );

        setStats(res.data);

    }

    return(

        <div>

            <h1 className="text-4xl font-bold mb-8">

                Revenus

            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-green-500 text-white rounded-3xl p-8">

                    <h3>Aujourd'hui</h3>

                    <p className="text-4xl font-bold mt-3">

                        {stats.revenueToday} FCFA

                    </p>

                </div>

                <div className="bg-orange-500 text-white rounded-3xl p-8">

                    <h3>Ce mois</h3>

                    <p className="text-4xl font-bold mt-3">

                        {stats.revenueMonth} FCFA

                    </p>

                </div>

                <div className="bg-blue-500 text-white rounded-3xl p-8">

                    <h3>Cette année</h3>

                    <p className="text-4xl font-bold mt-3">

                        {stats.revenueYear} FCFA

                    </p>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

                <h2 className="text-3xl font-bold mb-6">

                    Moyens de paiement

                </h2>

                <div className="space-y-5">

                    <div className="flex justify-between">

                        <span>

                            💙 Wave

                        </span>

                        <span className="font-bold">

                            {stats.wave}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            🟠 Orange Money

                        </span>

                        <span className="font-bold">

                            {stats.orange}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Revenue;