
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const MyDeliveryList = () => {
  // Static parcel data
  const parcels = [
    {
      id: 1,
      bookedUser: "John Doe",
      receiverName: "Jane Doe",
      bookedPhone: "123-456-7890",
      requestedDate: "2025-01-10",
      approximateDate: "2025-01-12",
      receiverPhone: "098-765-4321",
      receiverAddress: "123 Elm St, Springfield",
    },
    {
      id: 2,
      bookedUser: "Alice Smith",
      receiverName: "Bob Smith",
      bookedPhone: "987-654-3210",
      requestedDate: "2025-01-09",
      approximateDate: "2025-01-11",
      receiverPhone: "876-543-2109",
      receiverAddress: "456 Oak St, Shelbyville",
    },
  ];

  const handleStatusChange = (parcelId, status) => {
    toast.success(`Parcel ID ${parcelId} marked as ${status}`);
    console.log(`Parcel ID ${parcelId} updated to ${status}`);
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
                key={parcel.id}
                className="border-b hover:bg-gray-100"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: parcel.id * 0.2 }}
              >
                <td className="px-4 py-2 text-center">{parcel.bookedUser}</td>
                <td className="px-4 py-2 text-center">{parcel.receiverName}</td>
                <td className="px-4 py-2 text-center">{parcel.bookedPhone}</td>
                <td className="px-4 py-2 text-center">
                  {parcel.requestedDate}
                </td>
                <td className="px-4 py-2 text-center">
                  {parcel.approximateDate}
                </td>
                <td className="px-4 py-2 text-center">
                  {parcel.receiverPhone}
                </td>
                <td className="px-4 py-2 text-center">
                  {parcel.receiverAddress}
                </td>
                <td className="px-4 py-2 text-center space-y-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={() => console.log("View Location")}
                  >
                    View Location
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all duration-300"
                    onClick={() => handleStatusChange(parcel.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all duration-300"
                    onClick={() => handleStatusChange(parcel.id, "Delivered")}
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
