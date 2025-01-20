import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();

  // Data fetching
  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryMan");
      return res.data;
    },
  });

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <Helmet>
        <title> Go parcel | AllDeliveryMen</title>
      </Helmet>
      <h1 className="text-2xl sm:text-4xl font-bold text-green-600 text-center mb-6 animate-pulse">
        All Delivery Men
      </h1>

      {/* Responsive Table */}
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg bg-white">
          <thead>
            <tr className="bg-green-200 text-green-800 text-sm sm:text-base">
              <th className="border p-2 sm:p-4">Name</th>
              <th className="border p-2 sm:p-4">Phone Number</th>
              <th className="border p-2 sm:p-4">Parcels Delivered</th>
              <th className="border p-2 sm:p-4">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMen.map((man) => (
              <motion.tr
                key={man._id}
                className="hover:bg-green-50 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <td className="border p-2 sm:p-4 font-medium text-gray-800">
                  {man.name}
                </td>
                <td className="border p-2 sm:p-4">{man.phone || "N/A"}</td>
                <td className="border p-2 sm:p-4 text-center font-bold text-green-600">
                  {man.deliveryCount || "N/A"}
                </td>
                <td className="border p-2 sm:p-4 text-center font-bold text-yellow-500">
                  {man.avgReview || "N/A"} ★
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AllDeliveryMen;
