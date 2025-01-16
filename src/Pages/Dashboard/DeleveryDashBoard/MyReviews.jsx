
import { motion } from "framer-motion";

const MyReviews = () => {
  // Static reviews data
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://via.placeholder.com/100",
      date: "2025-01-12",
      rating: 4.5,
      feedback: "Excellent service! The delivery was on time, and everything went smoothly.",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://via.placeholder.com/100",
      date: "2025-01-10",
      rating: 5,
      feedback: "Very professional and courteous. Highly recommended!",
    },
    {
      id: 3,
      name: "Alice Brown",
      image: "https://via.placeholder.com/100",
      date: "2025-01-08",
      rating: 4,
      feedback: "Good service, but the delivery was slightly delayed. Overall satisfied.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Reviews
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: review.id * 0.2 }}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {review.name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{review.date}</p>
            <div className="flex items-center justify-center mb-4">
              <span className="text-yellow-500 text-xl font-bold mr-1">
                {review.rating}
              </span>
              <span className="text-gray-500">/ 5</span>
            </div>
            <p className="text-gray-600">{review.feedback}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MyReviews;
