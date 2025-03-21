import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = useSelector((state: any) => state.jwt);
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedJwt: any = jwtDecode(token);

  if (allowedRoles && !allowedRoles.includes(decodedJwt.accountType)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
