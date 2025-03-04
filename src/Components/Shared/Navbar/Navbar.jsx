import Container from "../Container";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Green and Yellow Illustrative Delivery Logo.png";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { FaBars, FaTimes, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [roleType] = useRole();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="fixed w-full bg-yellow-500 dark:bg-gray-900 z-20 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 text-gray-800 dark:text-white">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:text-gray-800 dark:hover:text-gray-300 transition duration-300"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:text-gray-800 dark:hover:text-gray-300 transition duration-300"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:text-gray-800 dark:hover:text-gray-300 transition duration-300"
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:text-gray-800 dark:hover:text-gray-300 transition duration-300"
                }
              >
                About Us
              </NavLink>
              
              {/* Dark Mode Toggle */}
              <button onClick={() => setDarkMode(!darkMode)} className="text-xl focus:outline-none">
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
              </button>

              {/* User Profile */}
              {user && user?.displayName ? (
                <div className="relative">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-lg"
                    >
                      <div className="p-4 border-b">
                        <p className="font-bold">{user.displayName}</p>
                      </div>
                      <>
                        {roleType?.admin === true && (
                          <Link to={"dashboard/statistics"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        {roleType?.deliveryMan === true && (
                          <Link to={"dashboard/my-delivery-list"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        {roleType?.normalUser === true && (
                          <Link to={"dashboard/my-parcels"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 bg-green-400 rounded hover:bg-green-700 transition duration-300">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
