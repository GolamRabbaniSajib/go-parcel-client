import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiFillCloseCircle } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Green and Yellow Illustrative Delivery Logo.png";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [roleType, isLoading] = useRole();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Sidebar Toggle Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-black text-white flex justify-between md:hidden p-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-10 rounded-full" />
          <span className="font-bold text-lg">Go Parcel</span>
        </div>
        <button onClick={handleToggle} className="focus:outline-none">
          {isActive ? (
            <AiFillCloseCircle className="w-6 h-6 text-red-400" />
          ) : (
            <AiOutlineBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-10 flex flex-col justify-between h-screen bg-gray-900 bg-opacity-90 backdrop-blur-lg w-64 p-5 shadow-xl text-white transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="text-center py-4">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 mx-auto rounded-full" />
          </Link>
          <h2 className="text-xl font-bold mt-2">Go Parcel</h2>
        </div>

        {/* Navigation Items */}
        <div className="flex-1">
          <ul className="space-y-6">
            {roleType?.normalUser && (
              <>
                <NavItem to="/dashboard/book-parcel" label="Book a Parcel" />
                <NavItem to="/dashboard/my-parcels" label="My Parcels" />
                <NavItem to="/dashboard/my-profile" label="My Profile" />
              </>
            )}
            {roleType?.deliveryMan && (
              <>
                <NavItem
                  to="/dashboard/my-delivery-list"
                  label="My Delivery List"
                />
                <NavItem to="/dashboard/my-reviews" label="My Reviews" />
              </>
            )}
            {roleType?.admin && (
              <>
                <NavItem to="/dashboard/all-parcels" label="All Parcels" />
                <NavItem to="/dashboard/all-users" label="All Users" />
                <NavItem
                  to="/dashboard/all-delivery-men"
                  label="All Delivery Men"
                />
                <NavItem to="/dashboard/statistics" label="Statistics" />
              </>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={logOut}
          className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          <GrLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-green-500 text-white"
              : "hover:bg-green-700 hover:text-white"
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default Sidebar;
