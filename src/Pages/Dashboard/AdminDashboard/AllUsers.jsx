import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Load users data
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Button Handlers
  const handleMakeDeliveryMen = async (id) => {
    try {
      const response = await axiosSecure.patch(`/user/${id}`, {
        roleType: "deliveryMan",
      });
      if (response.data.modifiedCount) {
        toast.success("User role updated to Delivery Man!");
        refetch(); // Refresh user data
      } else {
        toast.error("Failed to update user role. Try again.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("An error occurred while updating the role.");
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      const response = await axiosSecure.patch(`/user/${id}`, {
        roleType: "admin",
      });
      if (response.data.modifiedCount) {
        toast.success("User role updated to Admin!");
        refetch(); // Refresh user data
      } else {
        toast.error("Failed to update user role. Try again.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("An error occurred while updating the role.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen">
      {/* React Hot Toast */}

      <h1 className="text-4xl font-bold text-yellow-600 text-center mb-6 animate-pulse">
        All Users
      </h1>

      {/* Table */}
      <motion.table
        className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-blue-200 text-yellow-800">
            <th className="border p-4">Name</th>
            <th className="border p-4">Phone Number</th>
            <th className="border p-4">Parcels Booked</th>
            <th className="border p-4">Total Spent</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <motion.tr
              key={user._id}
              className="hover:bg-blue-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td className="border p-4 font-medium text-gray-800">
                {user.name}
              </td>
              <td className="border p-4">{user.phone || "N/A"}</td>
              <td className="border p-4 text-center font-bold text-blue-600">
                {user.parcelCount || "N/A"}
              </td>
              <td className="border p-4 text-center font-bold text-green-500">
                $ {user.totalSpent || "N/A"}
              </td>
              <td className="border p-4 text-center">
                <button
                  onClick={() => handleMakeDeliveryMen(user._id)}
                  className="bg-yellow-500 px-4 py-1 rounded-lg text-black cursor-pointer hover:bg-yellow-700 mx-1"
                >
                  Make Delivery Man
                </button>
                <button
                  onClick={() => handleMakeAdmin(user._id)}
                  className="bg-red-500 px-4 py-1 rounded-lg text-white cursor-pointer hover:bg-red-700 mx-1"
                >
                  Make Admin
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-blue-400`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
