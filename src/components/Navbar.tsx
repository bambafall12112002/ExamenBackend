import {
  Link,
  NavLink,
} from "react-router-dom"

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa"

import {
  useContext,
  useState,
} from "react"

import {
  CartContext,
} from "../context/CartContext"

import {
  AuthContext,
} from "../context/AuthContext"

const Navbar = () => {

  const [menuOpen,
    setMenuOpen] =
    useState(false)

  const { cart } =
    useContext(CartContext)

  const {
    user,
    logout,
  } = useContext(AuthContext)

  // TOTAL ARTICLES PANIER

  const totalItems =
    cart.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    )

  return (

    <nav className="bg-orange-500 text-white sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}

          <Link
            to="/"
            className="text-3xl font-bold"
          >
            Food On Line
          </Link>

          {/* MENU DESKTOP */}

          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold border-b-2"
                  : ""
              }
            >
              Accueil
            </NavLink>

            

            {/* UTILISATEUR CONNECTÉ */}

            {user ? (

              <button
                onClick={logout}
                className="bg-white text-orange-500 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Déconnexion
              </button>

            ) : (

              <>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold border-b-2"
                      : ""
                  }
                >
                  Connexion
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold border-b-2"
                      : ""
                  }
                >
                  Inscription
                </NavLink>

              </>

            )}

            {/* PANIER */}

            <Link
              to="/cart"
              className="relative"
            >

              <FaShoppingCart
                size={24}
              />

              {totalItems > 0 && (

                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

                  {totalItems}

                </span>

              )}

            </Link>

            <Link
  to="/admin/login"
  className="hover:text-orange-500"
>
  Admin
</Link>

          </div>

          {/* BOUTON MOBILE */}

          <button
            className="md:hidden"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >

            {menuOpen ? (
              <FaTimes size={26} />
            ) : (
              <FaBars size={26} />
            )}

          </button>

        </div>

      </div>

      {/* MENU MOBILE */}

      {menuOpen && (

        <div className="md:hidden bg-orange-600 px-4 py-6 space-y-5">

          <NavLink
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }

            className="block"
          >
            Accueil
          </NavLink>

          <NavLink
            to="/admin"
            onClick={() =>
              setMenuOpen(false)
            }

            className="block"
          >
            Admin
          </NavLink>

          {user ? (

            <button
              onClick={() => {

                logout()

                setMenuOpen(false)
              }}

              className="bg-white text-orange-500 px-4 py-2 rounded-xl"
            >
              Déconnexion
            </button>

          ) : (

            <>

              <NavLink
                to="/login"

                onClick={() =>
                  setMenuOpen(false)
                }

                className="block"
              >
                Connexion
              </NavLink>

              

            </>

          )}

          <Link
            to="/cart"

            onClick={() =>
              setMenuOpen(false)
            }

            className="flex items-center gap-3"
          >

            <FaShoppingCart />

            Panier
            ({totalItems})

          </Link>

        </div>

      )}

    </nav>
  )
}

export default Navbar