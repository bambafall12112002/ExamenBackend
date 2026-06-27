import {
  useContext,
  useState,
} from "react"

import {
  AuthContext,
} from "../context/AuthContext"

import {
  useNavigate,
} from "react-router-dom"

import toast from "react-hot-toast"

const Login = () => {

  const { login } =
    useContext(AuthContext)

  const navigate =
    useNavigate()

  const [phone, setPhone] =
    useState("")

  const [password,
    setPassword] =
    useState("")

 const handleLogin = async (
  e: React.FormEvent
) => {

  e.preventDefault()

  if (!phone || !password) {

    toast.error(
      "Veuillez remplir tous les champs"
    )

    return
  }

  try {

    await login(
      phone,
      password,
    )

    toast.success(
      "Connexion réussie"
    )

    navigate("/cart")

  } catch (error) {

    toast.error(
      "Téléphone ou mot de passe incorrect"
    )
  }
}

  return (

    <div className="min-h-screen flex items-center justify-center bg-orange-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Connexion
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Numéro téléphone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }

            className="w-full border p-4 rounded-xl"
          />

          <input
            type="password"
            placeholder="Mot de passe"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="w-full border p-4 rounded-xl"
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded-xl">

            Se connecter

          </button>

        </form>

      </div>

    </div>
  )
}

export default Login