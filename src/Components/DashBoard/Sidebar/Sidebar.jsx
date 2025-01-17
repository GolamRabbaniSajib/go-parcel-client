import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Green and Yellow Illustrative Delivery Logo.png";
import useAuth from "../../../hooks/useAuth";
const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const userType = "user";
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-yellow-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between items-center flex-1 mt-6">
            <ul className="menu bg-gray-100 space-y-8 p-4 rounded-box">
              {userType === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/book-parcel"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      Book a Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      My Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-profile"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      My Profile
                    </NavLink>
                  </li>
                </>
              )}
              {userType === "deliveryMan" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-delivery-list"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      My Delivery List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-reviews"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      My Reviews
                    </NavLink>
                  </li>
                </>
              )}
              {userType === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-parcels"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      All Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-users"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-delivery-men"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      All Delivery Men
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/statistics"
                      className={({ isActive }) =>
                        isActive
                          ? "bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl"
                          : "text-gray-600 hover:bg-yellow-100 hover:text-yellow-600"
                      }
                    >
                      Statistics
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div>
          <hr />

          {/* <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          /> */}
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
