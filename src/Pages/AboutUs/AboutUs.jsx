import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl bg-white shadow-xl rounded-2xl p-8 mt-16"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          About Us - <span className="font-semibold text-blue-600">Go Parcel</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Welcome to <span className="font-semibold text-blue-600">Go Parcel</span>,
          your trusted partner in seamless parcel handling and delivery
          solutions. We are dedicated to making shipping effortless, secure, and
          reliable.
        </motion.p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">🚀 Fast & Reliable</h3>
            <p className="text-gray-700 mt-2">
              Get your parcels delivered on time with our efficient logistics
              network.
            </p>
          </motion.div>

          <motion.div
            className="bg-green-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-600">📦 Easy Tracking</h3>
            <p className="text-gray-700 mt-2">
              Track your packages in real time with our smart tracking system.
            </p>
          </motion.div>

          <motion.div
            className="bg-yellow-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-yellow-600">💰 Affordable Pricing</h3>
            <p className="text-gray-700 mt-2">
              Enjoy competitive rates with transparent pricing and no hidden
              fees.
            </p>
          </motion.div>

          <motion.div
            className="bg-red-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-red-600">🛠 24/7 Support</h3>
            <p className="text-gray-700 mt-2">
              Our dedicated support team is always available to assist you.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="text-lg text-gray-700">
            Join us and experience a smarter way to send and receive parcels!
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
