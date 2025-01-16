import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/cover.jpg";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
const Profile = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5"
      >
        <motion.img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <motion.a
            href="#"
            className="relative block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </motion.a>

          <motion.p
            className="p-2 px-4 text-xs text-white bg-yellow-500 rounded-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Customer
          </motion.p>

          <motion.p
            className="mt-2 text-xl font-medium text-gray-800"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            User Id: {user.uid}
          </motion.p>

          <motion.div
            className="w-full p-2 mt-4 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">{user.displayName}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">{user.email}</span>
              </p>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <button className="bg-yellow-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-yellow-800 block mb-1">
                  Update Profile
                </button>
                <button className="bg-yellow-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-yellow-800">
                  Change Password
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
