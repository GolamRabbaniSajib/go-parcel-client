import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // get image link

    const imageFile = { image: event.target.image.files[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const form = event.target;
    const name = form.name.value;
    const userImage = res.data.data.display_url;
    const email = form.email.value;
    const password = form.password.value;
    try {
      //2. User Registration
      const result = await createUser(email, password);
      const uid = result.user.uid;

      //3. Save username & profile photo
      await updateUserProfile(name, userImage);
      const userInfo = {
        name,
        userImage,
        email,
        roleType: "normalUser",
        totalSpent: 0,
        parcelCount: 0,
        uid,
      };
      await axiosPublic.post("/users", userInfo).then((result) => {
        if (result.data.insertedId) {
          navigate("/");
          toast.success("Signup Successful");
        }
      });
      console.log(result);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await signInWithGoogle();
      const userData = result.user;
      console.log(userData);
      const userInfo = {
        name: userData.displayName,
        email: userData.email,
        userImage: userData.photoURL,
        roleType: "normalUser",
        totalSpent: 0,
        parcelCount: 0,
        uid: userData.uid,
      };
      await axiosPublic.post("/users", userInfo).then((result) => {
        if (result.data.insertedId) {
          navigate("/");
          toast.success("Signup Successful");
        }
      });
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500">
            Join Parcel Management for fast and secure deliveries!
          </p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          {/* Image Upload */}
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

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        {/* Google Sign-In */}
        <div
          onClick={handleGoogleSignIn}
          className="mt-6 flex items-center justify-center space-x-3 bg-gray-50 border border-gray-300 py-2 rounded-md shadow-md hover:bg-gray-100 cursor-pointer"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700">Continue with Google</span>
        </div>

        {/* Redirect to Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
