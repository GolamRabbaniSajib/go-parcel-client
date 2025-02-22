import { GrLogout } from "react-icons/gr";
import {
  AiOutlineBars,
  AiFillCloseCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { BiPackage, BiListCheck, BiLineChart } from "react-icons/bi";
import { MdPeople, MdDeliveryDining, MdRateReview } from "react-icons/md";
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
      <div className="bg-black z-30 text-white flex justify-between items-center p-4 md:hidden">
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
        className={`bg-gray-900 text-white bg-opacity-90 backdrop-blur-lg z-10 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition-transform duration-300 ease-in-out`}
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
                <NavItem
                  to="/dashboard/book-parcel"
                  label="Book a Parcel"
                  icon={<BiPackage />}
                />
                <NavItem
                  to="/dashboard/my-parcels"
                  label="My Parcels"
                  icon={<BiListCheck />}
                />
                <NavItem
                  to="/dashboard/my-profile"
                  label="My Profile"
                  icon={<AiOutlineUser />}
                />
              </>
            )}
            {roleType?.deliveryMan && (
              <>
                <NavItem
                  to="/dashboard/my-delivery-list"
                  label="My Delivery List"
                  icon={<MdDeliveryDining />}
                />
                <NavItem
                  to="/dashboard/my-reviews"
                  label="My Reviews"
                  icon={<MdRateReview />}
                />
              </>
            )}
            {roleType?.admin && (
              <>
                <NavItem
                  to="/dashboard/all-parcels"
                  label="All Parcels"
                  icon={<BiPackage />}
                />
                <NavItem
                  to="/dashboard/all-users"
                  label="All Users"
                  icon={<MdPeople />}
                />
                <NavItem
                  to="/dashboard/all-delivery-men"
                  label="All Delivery Men"
                  icon={<MdDeliveryDining />}
                />
                <NavItem
                  to="/dashboard/statistics"
                  label="Statistics"
                  icon={<BiLineChart />}
                />
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

// 🔥 Reusable Nav Item Component with Icon
const NavItem = ({ to, label, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-lg transition-all space-x-3 ${
            isActive
              ? "bg-green-500 text-white"
              : "hover:bg-green-700 hover:text-white"
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
