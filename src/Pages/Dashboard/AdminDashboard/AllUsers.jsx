
import { motion } from "framer-motion";
import { useState } from "react";

const AllUsers = () => {
  // Static data for users
  const users = [
    {
      id: 1,
      name: "User A",
      phone: "123-456-7890",
      parcels: 3,
      totalSpent: 150,
    },
    {
      id: 2,
      name: "User B",
      phone: "098-765-4321",
      parcels: 5,
      totalSpent: 250,
    },
    {
      id: 3,
      name: "User C",
      phone: "456-789-1230",
      parcels: 1,
      totalSpent: 50,
    },
    {
      id: 4,
      name: "User D",
      phone: "789-123-4567",
      parcels: 2,
      totalSpent: 100,
    },
    {
      id: 5,
      name: "User E",
      phone: "321-654-9870",
      parcels: 4,
      totalSpent: 200,
    },
    {
      id: 6,
      name: "User F",
      phone: "654-321-0987",
      parcels: 6,
      totalSpent: 300,
    },
    {
      id: 7,
      name: "User G",
      phone: "987-654-3210",
      parcels: 3,
      totalSpent: 150,
    },
    {
      id: 8,
      name: "User H",
      phone: "741-852-9630",
      parcels: 7,
      totalSpent: 350,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Calculate paginated users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Button Handlers
  const handleMakeDeliveryMen = (id) => {
    alert(`User with ID: ${id} is now a Delivery Man.`);
    // Implement API call to update user role in the database.
  };

  const handleMakeAdmin = (id) => {
    alert(`User with ID: ${id} is now an Admin.`);
    // Implement API call to update user role in the database.
  };

  return (
    <div className="p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen">
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
              key={user.id}
              className="hover:bg-blue-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td className="border p-4 font-medium text-gray-800">
                {user.name}
              </td>
              <td className="border p-4">{user.phone}</td>
              <td className="border p-4 text-center font-bold text-blue-600">
                {user.parcels}
              </td>
              <td className="border p-4 text-center font-bold text-green-500">
                ${user.totalSpent}
              </td>
              <td className="border p-4 text-center">
                <button
                  onClick={() => handleMakeDeliveryMen(user.id)}
                  className="bg-yellow-500 px-4 py-1 rounded-lg text-black cursor-pointer hover:bg-yellow-700 mx-1"
                >
                  Make Delivery Man
                </button>
                <button
                  onClick={() => handleMakeAdmin(user.id)}
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
