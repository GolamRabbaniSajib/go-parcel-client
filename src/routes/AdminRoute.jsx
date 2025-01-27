import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'
import LoadingSpinner from "../Components/Shared/LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const [roleType, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (roleType?.admin === true) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
