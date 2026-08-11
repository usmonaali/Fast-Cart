import { Navigate } from "react-router-dom";
import { getToken } from "../api/account";

const ProtectedRoute = ({ children }) => {
  const user = getToken("admin");
  const isAdmin = user?.role === "Admin" || user?.role === "SuperAdmin";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
