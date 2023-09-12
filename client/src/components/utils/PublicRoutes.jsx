import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let user = sessionStorage.getItem("user");
  return !!user;
};

export default function PublicRoutes() {
  const auth = useAuth();
  return !auth ? <Outlet /> : <Navigate to="/" replace />;
}
