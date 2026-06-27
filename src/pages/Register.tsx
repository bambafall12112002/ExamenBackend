import { useState } from "react";
import api from "../api/axios";

const Register = () => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/register",
        {
          nom,
          prenom,
          telephone,
          password,
        }
      );

      console.log(res.data);

      alert("Compte créé ✅");

    } catch (error) {

      console.log(error);

      alert("Erreur inscription ❌");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-orange-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Inscription
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nom"
            className="w-full border p-4 rounded-xl"
            value={nom}
            onChange={(e) =>
              setNom(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Prénom"
            className="w-full border p-4 rounded-xl"
            value={prenom}
            onChange={(e) =>
              setPrenom(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Téléphone"
            className="w-full border p-4 rounded-xl"
            value={telephone}
            onChange={(e) =>
              setTelephone(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border p-4 rounded-xl"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded-xl">
            Créer un compte
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register;