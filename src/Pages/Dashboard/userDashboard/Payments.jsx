import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payments = () => {
  const location = useLocation();

  const { price } = location.state || {};
  return (
    <div className="w-11/12 mx-auto space-y-10">
      <Helmet>
        <title> Go parcel | payment</title>
      </Helmet>
      <h1 className="text-4xl font-semibold text-green-500 text-center">
        Payment
      </h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm price={price}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
