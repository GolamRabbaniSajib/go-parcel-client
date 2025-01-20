import Container from "../Container";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Green and Yellow Illustrative Delivery Logo.png";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import useRole from "../../../hooks/useRole";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [roleType] = useRole();

  return (
    <div className="fixed w-full bg-yellow-500 z-20 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-8 w-8" />
            </Link>
            <div className="flex items-center space-x-4">
              <NavLink to={"/"}>Home</NavLink>
              <p>
                <IoNotificationsCircleSharp className="text-4xl" />
              </p>
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
                      className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg"
                    >
                      <div className="p-4 border-b">
                        <p className="font-bold">{user.displayName}</p>
                      </div>
                      <>
                        {roleType === "admin" && (
                          <Link to={"dashboard/statistics"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        {roleType === "deliveryMan" && (
                          <Link to={"dashboard/my-delivery-list"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        {roleType === "normalUser" && (
                          <Link to={"dashboard/my-parcels"}>
                            <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                              Dashboard
                            </div>
                          </Link>
                        )}

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
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
