import { useEffect, useState } from "react";
import api from "../../api/axios";

const Users = () => {

    const [users,setUsers]=useState([]);

    useEffect(()=>{

        fetchUsers();

    },[]);

    const fetchUsers=async()=>{

        const res=await api.get("/users");

        setUsers(res.data);

    }

    return(

        <div>

            <h1 className="text-4xl font-bold mb-8">

                Clients

            </h1>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                <table className="w-full">

                   <thead className="bg-orange-500 text-white">

<tr>

<th className="p-4">Nom</th>

<th>Téléphone</th>

<th>Email</th>

<th>Commandes</th>

<th>Total dépensé</th>

<th>Dernière commande</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{users.map((user:any)=>(

<tr
key={user.id}
className="border-b hover:bg-orange-50"
>

<td className="p-4">

{user.name}

</td>

<td>

{user.telephone}

</td>

<td>

{user.email}

</td>

<td>

<span className="font-bold">

{user.ordersCount}

</span>

</td>

<td className="text-green-600 font-bold">

{user.totalSpent} FCFA

</td>

<td>

{

user.lastOrder

?

new Date(user.lastOrder)

.toLocaleDateString()

:

"Aucune"

}

</td>

<td>

<button

className="bg-orange-500 text-white px-4 py-2 rounded-xl"

>

Voir

</button>

</td>

</tr>

))}

</tbody>

                    <tbody>

                        {users.map((user:any)=>(

                            <tr
                            key={user.id}
                            className="border-b hover:bg-orange-50"
                            >

                                <td className="p-4">

                                    {user.id}

                                </td>

                                <td>

                                    {user.name}

                                </td>

                                <td>

                                    {user.email}

                                </td>

                                <td>

                                    {user.telephone}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Users;