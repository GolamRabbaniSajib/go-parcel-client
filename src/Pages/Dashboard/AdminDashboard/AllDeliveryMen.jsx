import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  // data load
  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryMan");
      return res.data;
    },
  });
  // Static data for delivery men

  return (
    <div className="p-8 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-6 animate-pulse">
        All Delivery Men
      </h1>

      {/* Table */}
      <motion.table
        className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-green-200 text-green-800">
            <th className="border p-4">Name</th>
            <th className="border p-4">Phone Number</th>
            <th className="border p-4">Parcels Delivered</th>
            <th className="border p-4">Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.map((man) => (
            <motion.tr
              key={man._id}
              className="hover:bg-green-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td className="border p-4 font-medium text-gray-800">
                {man.name}
              </td>
              <td className="border p-4">{man.phone || "N/A"}</td>
              <td className="border p-4 text-center font-bold text-green-600">
                {man.parcelsDelivered || "N/A"}
              </td>
              <td className="border p-4 text-center font-bold text-yellow-500">
                {man.avgReview || "N/A"} ★
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default AllDeliveryMen;
