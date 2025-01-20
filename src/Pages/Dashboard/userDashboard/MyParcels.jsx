import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const MyParcels = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [reviewData, setReviewData] = useState({});
  console.log(selectedParcel);
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user.email}`);
      return res.data;
    },
  });

  const filteredParcels = filterStatus
    ? parcels.filter((parcel) => parcel.status === filterStatus)
    : parcels;

  const modalCancel = (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <div>
          <p>
            Are You <b>Sure</b>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-red-400 px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/parcels/${id}`
      );
      toast.success("Food Delete Successfully");
      refetch();
      console.log(data);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const handleOpenReviewModal = (parcel) => {
    setSelectedParcel(parcel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviewData({ rating: "", feedback: "" });
  };

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const handleSubmitReview = async () => {
    if (!reviewData.rating || !reviewData.feedback) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      await axiosSecure.post(`/reviews`, {
        userName: user.displayName,
        reviewDate: formattedDate,
        userImage: user.photoURL || "",
        deliveryManId: selectedParcel.deliveryManId,
        ...reviewData,
      });
      toast.success("Review submitted successfully!");
      handleCloseModal();
      refetch();
    } catch (error) {
      toast.error("Failed to submit review.");
      console.error(error);
    }
  };

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
            <option value="Pending">Pending</option>
            <option value="On The Way">On The Way</option>
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
                  <td className="py-4 px-4">{parcel.deliveryDate}</td>
                  <td className="py-4 px-4">
                    {parcel.approximateDeliveryDate || "N/A"}
                  </td>
                  <td className="py-4 px-4">
                    {new Date(parcel.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">{parcel.deliveryManId || "N/A"}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        parcel.status === "Pending"
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
                    <Link to={`/dashboard/updateParcel/${parcel._id}`}>
                      <button
                        className={`btn btn-sm px-4 py-2 ${
                          parcel.status === "Pending"
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-300 cursor-not-allowed text-gray-600"
                        }`}
                        disabled={parcel.status !== "Pending"}
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => modalCancel(parcel._id)}
                      className={`btn btn-sm px-4 py-2 ${
                        parcel.status === "Pending"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-300 cursor-not-allowed text-gray-600"
                      }`}
                      disabled={parcel.status !== "Pending"}
                    >
                      Cancel
                    </button>
                    {parcel.status === "delivered" && (
                      <button
                        onClick={() => handleOpenReviewModal(parcel)}
                        className="btn btn-sm px-4 py-2 bg-green-500 hover:bg-green-600 text-white"
                      >
                        Review
                      </button>
                    )}
                    <Link
                      to={"/dashboard/payments"}
                      state={{ price: parcel.price }}
                    >
                      <button className="btn btn-sm px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white">
                        Pay
                      </button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-400 p-6 rounded-2xl shadow-xl w-96 transform transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Submit Your Review
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user.displayName}
                disabled
                className="input input-bordered w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Delivery Man ID
              </label>
              <input
                type="text"
                value={selectedParcel.deliveryManId}
                disabled
                className="input input-bordered w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Rating (out of 5)
              </label>
              <input
                type="number"
                max="5"
                min="1"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({ ...reviewData, rating: e.target.value })
                }
                className="input input-bordered w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Feedback
              </label>
              <textarea
                value={reviewData.feedback}
                onChange={(e) =>
                  setReviewData({ ...reviewData, feedback: e.target.value })
                }
                className="textarea textarea-bordered w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="btn btn-sm bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
