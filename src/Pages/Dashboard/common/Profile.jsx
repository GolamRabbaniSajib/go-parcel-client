import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/cover.jpg";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // get image link

    const imageFile = { image: event.target.image.files[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const userImage = res.data.data.display_url;
    const name = user?.displayName;
    // Save username & profile photo
    await updateUserProfile(name, userImage);
    toast.success('image successfully change')
  };

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
          <motion.div
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
          </motion.div>

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
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-4">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">{user.displayName}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">{user.email}</span>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-md px-4 py-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
              >
                Update Profile Picture
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
