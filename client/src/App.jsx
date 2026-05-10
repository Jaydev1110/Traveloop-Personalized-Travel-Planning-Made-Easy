import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CreateTrip from './pages/CreateTrip.jsx';
import MyTrips from './pages/MyTrips.jsx';

function ProtectedRoute({ children, requireAdmin }) {
  const { user, loading, isAdmin, adminShell } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-500 dark:bg-stone-950 dark:text-stone-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-stone-900 border-t-transparent dark:border-stone-100" />
          <span className="text-sm font-medium tracking-wide">Loading…</span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin) {
    if (!isAdmin) return <Navigate to="/home" replace />;
    if (adminShell === 'traveler') return <Navigate to="/home" replace />;
    return children;
  }
  if (isAdmin && adminShell === 'console') {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function postLoginPath(user, adminShell) {
  if (!user) return '/login';
  if (user.role === 'admin' && adminShell === 'console') return '/admin';
  return '/home';
}

export default function App() {
  const { user, loading, adminShell } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to={postLoginPath(user, adminShell)} replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          user ? <Navigate to={postLoginPath(user, adminShell)} replace /> : <Register />
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/create"
        element={
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          loading ? (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-500 dark:bg-stone-950 dark:text-stone-400">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-stone-900 border-t-transparent dark:border-stone-100" />
            </div>
          ) : (
            <Navigate to={user ? postLoginPath(user, adminShell) : '/login'} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
