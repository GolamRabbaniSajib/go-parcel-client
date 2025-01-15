import { motion } from "framer-motion";
import { FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";
import Container from "../../Shared/Container";


const Features = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-yellow-500" />,
      title: "Parcel Safety",
      description:
        "Your parcels are handled with the utmost care and security.",
    },
    {
      icon: <FaTruck className="text-4xl text-yellow-500" />,
      title: "Super Fast Delivery",
      description: "We ensure timely delivery, no matter the destination.",
    },
    {
      icon: <FaHeadset className="text-4xl text-yellow-500" />,
      title: "24/7 Support",
      description: "Our support team is available around the clock for you.",
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md p-6 rounded-lg text-center transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4 flex justify-center items-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Features;
