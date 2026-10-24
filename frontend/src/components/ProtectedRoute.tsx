import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Wraps any route that requires a logged-in user. Reacts to `user` becoming
 * null (sign-out, or the server telling us a session is no longer valid)
 * and navigates to /login *through the router* — no hard page reload, so
 * this takes effect the instant React re-renders, not on the next manual
 * refresh.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  // Avoid a flash-redirect to /login while we're still checking an existing
  // token on initial page load.
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
