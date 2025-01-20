import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [roleType, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (roleType === "admin") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
