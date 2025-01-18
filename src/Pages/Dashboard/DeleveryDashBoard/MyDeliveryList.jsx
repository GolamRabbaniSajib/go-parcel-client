import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/deliveryManId-parcels/${user.uid}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    toast((t) => (
      <div className="flex items-center gap-4">
        <p>Are you sure you want to cancel this booking?</p>
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all duration-300"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const toastId = toast.loading("Cancelling booking...");
                await axiosSecure.put(`/update-parcel/${id}`, {
                  status: "Pending",
                  deliveryManId: "",
                  approximateDeliveryDate: "",
                });
                toast.success("Booking cancelled successfully!", {
                  id: toastId,
                });
                refetch();
              } catch (error) {
                toast.error("Failed to cancel booking.");
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all duration-300"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handleDeliver = async (parcelId) => {
    try {
      const toastId = toast.loading("Marking as delivered...");
      await axiosSecure.put(`/update-parcel/${parcelId}`, {
        status: "delivered",
      });
      toast.success("Parcel marked as delivered!", { id: toastId });
      refetch();
    } catch (error) {
      toast.error("Failed to mark as delivered.");
    }
  };

  const handleViewLocation = (location) => {
    if (location) {
      window.open(location, "_blank");
    } else {
      toast.error("Location not available for this parcel.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Delivery List
      </motion.h1>
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <th className="px-4 py-2">Booked User</th>
              <th className="px-4 py-2">Receiver</th>
              <th className="px-4 py-2">Booked Phone</th>
              <th className="px-4 py-2">Requested Date</th>
              <th className="px-4 py-2">Approximate Date</th>
              <th className="px-4 py-2">Receiver Phone</th>
              <th className="px-4 py-2">Receiver Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <motion.tr
                key={parcel._id}
                className="border-b hover:bg-gray-100"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: parcel.id * 0.2 }}
              >
                <td className="px-4 py-2 text-center">{parcel.name}</td>
                <td className="px-4 py-2 text-center">{parcel.receiverName}</td>
                <td className="px-4 py-2 text-center">{parcel.phone}</td>
                <td className="px-4 py-2 text-center">{parcel.deliveryDate}</td>
                <td className="px-4 py-2 text-center">
                  {parcel.approximateDeliveryDate || "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {parcel.receiverPhone}
                </td>
                <td className="px-4 py-2 text-center">
                  {parcel.deliveryAddress}
                </td>
                <td className="px-4 py-2 text-center space-y-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={() => handleViewLocation(parcel.location)}
                  >
                    View Location
                  </button>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-lg transition-all duration-300 ${
                      parcel.status === "delivered" ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                    }`}
                    onClick={() => handleCancel(parcel._id)}
                    disabled={parcel.status === "delivered"}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-green-500 text-white px-3 py-1 rounded-lg transition-all duration-300 ${
                      parcel.status === "delivered" ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                    }`}
                    onClick={() => handleDeliver(parcel._id)}
                    disabled={parcel.status === "delivered"}
                  >
                    Deliver
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyDeliveryList;
