import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContractUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success toast notification
    toast.success("Message Sent Successfully!", {
      duration: 3000,
      position: "top-center",
    });

    // Reset form fields
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl bg-white shadow-xl rounded-2xl mt-16 p-8"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Contact Us
        </motion.h2>

        <p className="text-gray-600 text-lg text-center">
          Have questions or need assistance? Reach out to us and we'll be happy to help!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="flex flex-col">
            <label className="text-gray-700 font-medium">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
              placeholder="Write your message here..."
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-700">📍 Location: Dhaka, Bangladesh</p>
          <p className="text-gray-700">📞 Phone: +880 1234 567 890</p>
          <p className="text-gray-700">📧 Email: support@parcelxpress.com</p>
        </div>
      </motion.div>

      {/* Hot Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default ContractUs;
