import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// ProtectedRoute안에 있는 route들을 인자로 받아서 현재 로그인된 사용자가 없다면 /login으로 redirect
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
