import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const BookParcel = () => {
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Get today's date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  const handleWeightChange = (e) => {
    const weight = parseFloat(e.target.value);
    if (!isNaN(weight)) {
      const calculatedPrice = calculatePrice(weight);
      setPrice(calculatedPrice);
    } else {
      setPrice(0);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve input values
    const formData = new FormData(e.target);

    // Extract all data into an orderData object
    const parcelData = {
      name: user.displayName,
      email: user.email,
      phone: formData.get("phone"),
      parcelType: formData.get("parcelType"),
      weight: parseFloat(formData.get("weight")),
      receiverName: formData.get("receiverName"),
      receiverPhone: formData.get("receiverPhone"),
      deliveryAddress: formData.get("deliveryAddress"),
      bookingDate: formData.get("bookingDate"),
      deliveryDate: formData.get("deliveryDate"),
      latitude: parseFloat(formData.get("latitude")),
      longitude: parseFloat(formData.get("longitude")),
      price: price,
      status: "Pending",
    };

    const parcelPrice = parseFloat(price);
    console.log(parcelPrice);

    axiosSecure.put(`/users/${user.email}`, { parcelPrice }).then((result) => {
      console.log(result);
    });

    axiosSecure.post("/parcels", parcelData).then((result) => {
      if (result.data.insertedId) {
        toast.success(" Successfully Parcel Book");
      }
    });

    console.log("Order Data:", parcelData);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-yellow-600 mb-10 text-center"
      >
        Book a Parcel
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-4xl mx-auto border border-gray-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Name (Read-Only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Email (Read-Only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Booking Date
          </label>
          <input
            type="date"
            name="bookingDate"
            value={getCurrentDate()}
            readOnly
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Parcel Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Parcel Type
          </label>
          <input
            type="text"
            name="parcelType"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Parcel Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Parcel Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            min="0.1"
            step="0.1"
            onChange={handleWeightChange}
            required
          />
        </div>

        {/* Receiver's Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Receiver’s Name
          </label>
          <input
            type="text"
            name="receiverName"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Receiver's Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Receiver Phone Number
          </label>
          <input
            type="text"
            name="receiverPhone"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Requested Delivery Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Requested Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Delivery Latitude */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Delivery Address Latitude
          </label>
          <input
            type="number"
            name="latitude"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Delivery Longitude */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Delivery Address Longitude
          </label>
          <input
            type="number"
            name="longitude"
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            required
          />
        </div>

        {/* Price (Read-Only) */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Price (Tk)
          </label>
          <input
            type="text"
            name="price"
            value={price}
            className="input input-bordered w-full bg-gray-50 border border-gray-300 rounded-md p-3"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-full py-3 rounded-md"
        >
          Book Parcel
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default BookParcel;
