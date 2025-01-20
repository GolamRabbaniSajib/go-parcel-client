import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivetRoutes";
import BookParcel from "../Components/DashBoard/UserSlide/BookParcel";
import MyParcels from "../Pages/Dashboard/userDashboard/MyParcels";
import Profile from "../Pages/Dashboard/common/Profile";
import AllParcels from "../Pages/Dashboard/AdminDashboard/AllParcels";
import AllDeliveryMen from "../Pages/Dashboard/AdminDashboard/AllDeliveryMen";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import MyDeliveryList from "../Pages/Dashboard/DeleveryDashBoard/MyDeliveryList";
import MyReviews from "../Pages/Dashboard/DeleveryDashBoard/MyReviews";
import UpdatePage from "../Pages/Dashboard/userDashboard/UpdatePage";
import StatisticsPage from "../Pages/Dashboard/AdminDashboard/StatisticsPage";
import Payments from "../Pages/Dashboard/userDashboard/Payments";
import PaymentSuccess from "../Pages/Dashboard/userDashboard/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // for user
      {
        path: "book-parcel",
        element: (
          <PrivateRoute>
            <BookParcel></BookParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcels",
        element: (
          <PrivateRoute>
            <MyParcels></MyParcels>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: <Profile></Profile>,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/dashboard/updateParcel/:id",
        element: <UpdatePage></UpdatePage>,
      },
      {
        path: "payments",
        element: <Payments></Payments>,
      },
      // for admin
      {
        path: "all-parcels",
        element: <AllParcels></AllParcels>,
      },
      {
        path: "all-delivery-men",
        element: <AllDeliveryMen></AllDeliveryMen>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "statistics",
        element: <StatisticsPage></StatisticsPage>,
      },
      // for delivery man
      {
        path: "my-delivery-list",
        element: <MyDeliveryList></MyDeliveryList>,
      },
      {
        path: "my-reviews",
        element: <MyReviews></MyReviews>,
      },
    ],
  },
]);
