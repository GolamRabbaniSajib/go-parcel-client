import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'
import LoadingSpinner from "../Components/Shared/LoadingSpinner/LoadingSpinner";

const DeliveryManRoute = ({ children }) => {
  const [roleType, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (roleType?.deliveryMan === true) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

DeliveryManRoute.propTypes = {
  children: PropTypes.element,
};

export default DeliveryManRoute;
