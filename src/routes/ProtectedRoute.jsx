import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenicated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
