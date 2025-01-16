import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
const MyParcels = () => {
  const [filterStatus, setFilterStatus] = useState("");

  // Static parcel data
  const parcels = [
    {
      _id: "1",
      parcelType: "Electronics",
      requestedDeliveryDate: "2025-01-20",
      approxDeliveryDate: "2025-01-25",
      bookingDate: "2025-01-15",
      deliveryMenId: "DM001",
      status: "pending",
    },
    {
      _id: "2",
      parcelType: "Clothing",
      requestedDeliveryDate: "2025-01-22",
      approxDeliveryDate: "2025-01-27",
      bookingDate: "2025-01-16",
      deliveryMenId: "DM002",
      status: "delivered",
    },
    {
      _id: "3",
      parcelType: "Groceries",
      requestedDeliveryDate: "2025-01-18",
      approxDeliveryDate: "2025-01-20",
      bookingDate: "2025-01-14",
      deliveryMenId: "",
      status: "on the way",
    },
  ];

  const filteredParcels = filterStatus
    ? parcels.filter((parcel) => parcel.status === filterStatus)
    : parcels;
  return (
    <div>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-10 px-4 md:px-8"
      >
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-[#2A4365] mb-10">
          My Parcels
        </h1>

        {/* Filter Dropdown */}
        <div className="flex justify-between items-center mb-8">
          <label className="text-lg font-medium text-[#4A5568]">
            Filter by Status:
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered bg-white text-[#2D3748] border-gray-300 shadow-sm focus:ring focus:ring-blue-300 w-full max-w-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="on the way">On The Way</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Parcels Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto bg-white shadow-lg rounded-lg"
        >
          <table className="table-auto w-full text-sm text-left text-gray-600">
            <thead className="bg-[#2A4365] text-white">
              <motion.tr
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <th className="py-3 px-4">Parcel Type</th>
                <th className="py-3 px-4">Requested Delivery</th>
                <th className="py-3 px-4">Approx. Delivery</th>
                <th className="py-3 px-4">Booking Date</th>
                <th className="py-3 px-4">Delivery Men ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </motion.tr>
            </thead>
            <tbody>
              {filteredParcels.map((parcel) => (
                <motion.tr
                  key={parcel._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-100"
                >
                  <td className="py-4 px-4">{parcel.parcelType}</td>
                  <td className="py-4 px-4">{parcel.requestedDeliveryDate}</td>
                  <td className="py-4 px-4">
                    {parcel.approxDeliveryDate || "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    {new Date(parcel.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">{parcel.deliveryMenId || "N/A"}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        parcel.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : parcel.status === "on the way"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 space-x-2">
                    <button
                      className={`btn btn-sm px-4 py-2 ${
                        parcel.status === "pending"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-gray-300 cursor-not-allowed text-gray-600"
                      }`}
                      disabled={parcel.status !== "pending"}
                    >
                      Update
                    </button>
                    <button
                      className={`btn btn-sm px-4 py-2 ${
                        parcel.status === "pending"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-300 cursor-not-allowed text-gray-600"
                      }`}
                      disabled={parcel.status !== "pending"}
                    >
                      Cancel
                    </button>
                    {parcel.status === "delivered" && (
                      <button className="btn btn-sm px-4 py-2 bg-green-500 hover:bg-green-600 text-white">
                        Review
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyParcels;
