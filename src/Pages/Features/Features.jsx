import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Tracking",
    description:
      "Track your parcels in real-time with accurate location updates.",
    icon: "📍",
  },
  {
    title: "Secure & Reliable",
    description: "We ensure secure and on-time delivery for all shipments.",
    icon: "🔒",
  },
  {
    title: "Easy Parcel Management",
    description:
      "Manage shipments effortlessly with our user-friendly dashboard.",
    icon: "📦",
  },
  {
    title: "Instant Notifications",
    description: "Get SMS and email updates on parcel status changes.",
    icon: "📩",
  },
  {
    title: "Flexible Payment Options",
    description:
      "Pay securely with multiple payment methods including cards and wallets.",
    icon: "💳",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our support team is available 24/7 to assist you with any queries.",
    icon: "☎️",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen pt-32 bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <motion.h2
        className="text-4xl font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Key Features
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
