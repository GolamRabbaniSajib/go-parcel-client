import { motion } from "framer-motion";
import Container from "../../Shared/Container";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TopDeliveryMen = () => {
  const axiosPublic = useAxiosPublic()

  // Load book parcels data
  const { data: deliveryMen = [] } = useQuery({
    queryKey: ["top-deliveryMan"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews-users");
      return res.data;
    },
  });
  
  return (
    <div className="py-12 bg-gray-100">
      <Container>
        <div className=" text-center">
          {/* Section Title */}
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Top Delivery Men
          </motion.h2>

          {/* Delivery Men Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryMen.map((man, index) => (
              <motion.div
                key={man._id}
                className="bg-white shadow-md p-6 rounded-lg text-center transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={man.userImage}
                  alt={man.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{man.name}</h3>
                <p className="text-gray-600 mb-2">
                  Parcels Delivered:{" "}
                  <span className="font-bold">{man.deliveryCount}</span>
                </p>
                {/* <p className="text-gray-600">
                  Average Rating:{" "}
                  <span className="font-bold text-yellow-500">
                    {man.averageRating.toFixed(1)}
                  </span>
                </p> */}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopDeliveryMen;
