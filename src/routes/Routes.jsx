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
import AdminRoute from "./AdminRoute";
import DeliveryManRoute from "./DeliveryManRoute";

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
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateParcel/:id",
        element: (
          <PrivateRoute>
            <UpdatePage></UpdatePage>
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <Payments></Payments>
          </PrivateRoute>
        ),
      },
      // for admin
      {
        path: "all-parcels",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllParcels></AllParcels>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-delivery-men",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDeliveryMen></AllDeliveryMen>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <StatisticsPage></StatisticsPage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      // for delivery man
      {
        path: "my-delivery-list",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyDeliveryList></MyDeliveryList>
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyReviews></MyReviews>
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
