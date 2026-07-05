import {
  FaTachometerAlt,
  FaClipboardList,
  FaUtensils,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const menu = [
    {
      title: "Tableau de bord",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      title: "Commandes",
      icon: <FaClipboardList />,
      path: "/admin/orders",
    },
    {
      title: "Plats",
      icon: <FaUtensils />,
      path: "/admin/foods",
    },
    {
      title: "Clients",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      title: "Revenus",
      icon: <FaChartLine />,
      path: "/admin/revenue",
    },
    {
      title: "Paramètres",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-72 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="p-8 border-b border-gray-700">

        <h1 className="text-3xl font-extrabold text-orange-500">
          FoodOnline
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Administration
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 p-5 space-y-3">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>
          </NavLink>

        ))}

      </nav>

      {/* Déconnexion */}

      <div className="p-5 border-t border-gray-700">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all py-4 rounded-xl font-semibold"
        >
          <FaSignOutAlt />
          Déconnexion
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;