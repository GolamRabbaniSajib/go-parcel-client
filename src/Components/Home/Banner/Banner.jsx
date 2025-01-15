import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1713646778050-2213b4140e6b?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center text-white z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Welcome to Parcel Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl text-gray-300"
        >
          Simplifying your parcel handling with speed and efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <input
            type="text"
            placeholder="Search for sports gear..."
            className="w-3/4 md:w-1/2 p-3 rounded-l-md outline-none text-gray-800"
          />
          <button className="px-6 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition duration-300">
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
