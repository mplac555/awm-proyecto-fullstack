import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let { user, role } = sessionStorage;
  if (user) {
    return { auth: true, role: role };
  } else {
    return { auth: false, role: null };
  }
};

export default function ProtectedRoutes({ role }) {
  const { auth, role: currentRole } = useAuth();

  if (role) {
    return auth ? (
      currentRole === role ? (
        <Outlet />
      ) : (
        <Navigate to="/prohibido" replace />
      )
    ) : (
      <Navigate to="/login" replace />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" replace />;
  }

  // return <Outlet />;
}
