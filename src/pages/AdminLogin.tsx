import {
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import toast from "react-hot-toast"

const AdminLogin = () => {

  const navigate =
    useNavigate()

  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const handleAdminLogin = (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    // IDENTIFIANTS ADMIN DEMO

    if (
      email ===
        "admin@food.com" &&

      password ===
        "admin123"
    ) {

      localStorage.setItem(
        "admin",
        "true"
      )

      toast.success(
        "Connexion admin réussie"
      )

      navigate(
        "/admin/dashboard"
      )

    } else {

      toast.error(
        "Identifiants incorrects"
      )
    }
  }

  return (

    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-8">

          Admin Login

        </h1>

        <form
          onSubmit={
            handleAdminLogin
          }

          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email admin"

            value={email}

            onChange={(e) =>
              setEmail(
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

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition">

            Connexion

          </button>

        </form>

      </div>

    </div>
  )
}

export default AdminLogin