/**
 * Main Application Component
 * 
 * Serves as the root component that handles:
 * - Authentication state management
 * - Navigation between authenticated and unauthenticated views
 * - Error handling and display
 * 
 * Architecture:
 * - Uses custom useAuth hook for authentication logic
 * - Delegates to Dashboard for authenticated view
 * - Delegates to LandingPage for unauthenticated view
 */

import { useAuth } from './hooks/useAuth'; 
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';

export default function App() {
  const { isAuthenticated, isLoading, error, user, handleLogin, handleLogout } =
    useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* ── Navigation Bar ── */}
      <NavBar
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* ── Page Content ── */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-600/30 rounded-lg text-red-400">
            <p className="text-sm font-medium">{error.message}</p>
          </div>
        )}

        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <LandingPage onLogin={handleLogin} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}
