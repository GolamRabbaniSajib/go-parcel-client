import { motion } from "framer-motion";
import Container from "../Container";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <div className=" px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4">GO PARCEL</h3>
              <p className="text-gray-400">
                Simplify your deliveries with our reliable and fast service.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/features" className="hover:underline">
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Parcel Management. All rights
              reserved.
            </p>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
