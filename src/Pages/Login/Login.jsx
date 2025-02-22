import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const credentials = {
    user: { email: "user@user.com", password: "User72" },
    deliveryMan: { email: "r@b.com", password: "Sajib72" },
    admin: { email: "admin@admin.com", password: "Admin72" },
  };

  const handleFillCredentials = (role) => {
    document.getElementById("email").value = credentials[role].email;
    document.getElementById("password").value = credentials[role].password;
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = result.user;
      const userInfo = {
        name: userData.displayName,
        email: userData.email,
        roleType: "normalUser",
        totalSpent: 0,
        parcelCount: 0,
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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Helmet>
        <title>Go Parcel | Login</title>
      </Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-yellow-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-yellow-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-yellow-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Quick Login Buttons */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 text-center mb-2">Quick Login</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm"
              onClick={() => handleFillCredentials("user")}
            >
              User
            </button>
            <button
              className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
              onClick={() => handleFillCredentials("deliveryMan")}
            >
              Delivery Man
            </button>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
              onClick={() => handleFillCredentials("admin")}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="space-y-1 text-center mt-4">
          <button className="text-xs hover:underline hover:text-yellow-500 text-gray-400">
            Forgot password?
          </button>
        </div>

        {/* Social Login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Signup Link */}
        <p className="px-6 text-sm text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-yellow-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
