
import { motion } from "framer-motion";

const AllDeliveryMen = () => {
  // Static data for delivery men
  const deliveryMen = [
    {
      id: 1,
      name: "Delivery Man A",
      phone: "123-456-7890",
      parcelsDelivered: 120,
      avgReview: 4.5,
    },
    {
      id: 2,
      name: "Delivery Man B",
      phone: "098-765-4321",
      parcelsDelivered: 95,
      avgReview: 4.2,
    },
    {
      id: 3,
      name: "Delivery Man C",
      phone: "456-789-1230",
      parcelsDelivered: 75,
      avgReview: 4.0,
    },
    {
      id: 4,
      name: "Delivery Man D",
      phone: "789-123-4567",
      parcelsDelivered: 50,
      avgReview: 3.8,
    },
  ];

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
              key={man.id}
              className="hover:bg-green-50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td className="border p-4 font-medium text-gray-800">
                {man.name}
              </td>
              <td className="border p-4">{man.phone}</td>
              <td className="border p-4 text-center font-bold text-green-600">
                {man.parcelsDelivered}
              </td>
              <td className="border p-4 text-center font-bold text-yellow-500">
                {man.avgReview} ★
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default AllDeliveryMen;
