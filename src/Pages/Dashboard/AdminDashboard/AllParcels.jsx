import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllParcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch parcels with optional date range
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["all-parcels", { from: fromDate, to: toDate }],
    queryFn: async ({ queryKey }) => {
      const [, { from, to } = {}] = queryKey;
      const query = from && to ? `?from=${from}&to=${to}` : "";
      const res = await axiosSecure.get(`/all-parcels${query}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch delivery men
  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryMenSelect"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryMan");
      return res.data;
    },
  });

  // Handle search functionality
  const handleSearch = () => {
    if (fromDate && toDate) {
      refetch();
    } else {
      toast.error("Please select both dates.");
    }
  };

  // Handle parcel assignment
  const handleAssign = () => {
    if (
      selectedParcel.deliveryManId &&
      selectedParcel.approximateDeliveryDate
    ) {
      axiosSecure
        .put(`/update-parcel/${selectedParcel._id}`, {
          status: "On The Way",
          deliveryManId: selectedParcel.deliveryManId,
          approximateDeliveryDate: selectedParcel.approximateDeliveryDate,
        })
        .then(() => {
          toast.success("Parcel assigned successfully!");
          setSelectedParcel(null); // Close modal
          refetch(); // Refresh data
        })
        .catch(() => toast.error("Failed to assign parcel."));
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="p-8 min-h-screen">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6 animate-pulse">
          All Parcels
        </h1>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            className="border p-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <motion.button
            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-700"
            whileTap={{ scale: 0.9 }}
            onClick={handleSearch}
          >
            Search
          </motion.button>
        </div>

        {/* Parcels Table */}
        <motion.table
          className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-blue-200 text-blue-800">
              <th className="border p-4">User Name</th>
              <th className="border p-4">Phone</th>
              <th className="border p-4">Booking Date</th>
              <th className="border p-4">Requested Delivery Date</th>
              <th className="border p-4">Cost</th>
              <th className="border p-4">Status</th>
              <th className="border p-4">Manage</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <motion.tr
                key={parcel._id}
                className="hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <td className="border p-4">{parcel.name}</td>
                <td className="border p-4">{parcel.phone}</td>
                <td className="border p-4">
                  {parcel.bookingDate ? parcel.bookingDate : "N/A"}
                </td>
                <td className="border p-4">{parcel.deliveryDate}</td>
                <td className="border p-4 text-green-600 font-bold">
                  {parcel.price} $
                </td>
                <td
                  className={`border p-4 font-semibold ${
                    parcel.status === "Pending"
                      ? "text-yellow-600"
                      : parcel.status === "On The Way"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {parcel.status}
                </td>
                <td className="border p-4 text-center">
                  <motion.button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 text-white rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedParcel(parcel)}
                  >
                    Manage
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>

        {/* Modal for Managing Parcel */}
        <AnimatePresence>
          {selectedParcel && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-bold text-blue-600 mb-4">
                  Manage Parcel
                </h2>
                <label className="block mb-2 text-gray-600">
                  Select Delivery Man
                </label>
                <select
                  className="w-full border p-2 rounded mb-4"
                  onChange={(e) =>
                    setSelectedParcel((prev) => ({
                      ...prev,
                      deliveryManId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select</option>
                  {deliveryMen.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man.name}
                    </option>
                  ))}
                </select>
                <label className="block mb-2 text-gray-600">
                  Approximate Delivery Date
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded mb-4"
                  onChange={(e) =>
                    setSelectedParcel((prev) => ({
                      ...prev,
                      approximateDeliveryDate: e.target.value,
                    }))
                  }
                />
                <div className="flex space-x-4">
                  <motion.button
                    className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-700"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAssign}
                  >
                    Assign
                  </motion.button>
                  <motion.button
                    className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-700"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedParcel(null)}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllParcels;
