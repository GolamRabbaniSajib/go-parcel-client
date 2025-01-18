
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const ReviewModal = ({ isOpen, onClose, deliveryManId, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !feedback) {
      toast.error("Please provide both rating and feedback.");
      return;
    }

    try {
      const toastId = toast.loading("Submitting review...");
      await axiosSecure.post("/reviews", {
        userName: user.displayName,
        userImage: user.photoURL,
        rating,
        feedback,
        deliveryManId,
      });
      toast.success("Review submitted successfully!", { id: toastId });
      refetch();
      onClose();
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image</label>
            <img
              src={user.photoURL}
              alt="User"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Rating out of 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Your feedback"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Delivery Man ID</label>
            <input
              type="text"
              value={deliveryManId}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReviewModal;
