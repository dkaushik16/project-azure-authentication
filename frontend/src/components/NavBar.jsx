/**
 * Navigation Bar Component
 * 
 * Displays the application header with:
 * - Application branding
 * - User info when authenticated
 * - Login/Logout buttons based on auth state
 */

import { MicrosoftIcon } from '../utils/icons';

export default function NavBar({
  isAuthenticated,
  isLoading,
  user,
  onLogin,
  onLogout,
}) {
  const userName = user?.name || user?.username || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ── Branding ── */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            E
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">
            EntraDemo
          </span>
          <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-0.5 rounded-full">
            v1.0
          </span>
        </div>

        {/* ── Auth Actions ── */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* User Profile Badge */}
              <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white">
                  {userInitial}
                </div>
                <span className="text-sm text-gray-300 max-w-[160px] truncate">
                  {userName}
                </span>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={onLogout}
                disabled={isLoading}
                className="text-sm px-4 py-1.5 cursor-pointer rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </button>
            </>
          ) : (
            /* Sign In Button */
            <button
              onClick={onLogin}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <MicrosoftIcon />
              {isLoading ? 'Signing in...' : 'Sign In with Microsoft'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
