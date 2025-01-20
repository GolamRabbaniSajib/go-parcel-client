import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const UpdatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { data: parcel = [] } = useQuery({
    queryKey: ["update-parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${id}`);
      return res.data;
    },
  });

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
      deliveryDate: formData.get("deliveryDate"),
      latitude: parseFloat(formData.get("latitude")),
      longitude: parseFloat(formData.get("longitude")),
      price: price,
    };

    axiosSecure.put(`/update-parcel/${id}`, parcelData).then((result) => {
      
      if (result.data.modifiedCount) {
        navigate("/dashboard/my-parcels");
        toast.success("Parcel Update Successful");
      }
    });

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

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            defaultValue={parcel.phone}
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
            defaultValue={parcel.parcelType}
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
            defaultValue={parcel.weight}
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
            defaultValue={parcel.receiverName}
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
            defaultValue={parcel.receiverPhone}
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
            defaultValue={parcel.deliveryAddress}
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
            defaultValue={parcel.deliveryDate}
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
            defaultValue={parcel.latitude}
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
            defaultValue={parcel.longitude}
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
            defaultValue={parcel.price}
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

export default UpdatePage;
