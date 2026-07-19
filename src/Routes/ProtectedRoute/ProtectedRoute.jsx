import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function ProtectedRoute({ children }) {
  const { user, loading } = use(AuthContext)
  const l = useLocation();
  if (loading) return <Loading />;
  if (!user)
    return <Navigate to="/login" replace state={{ from: l.pathname }} />;
  return children;
}
