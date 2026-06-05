/**
 * Landing Page Component
 * 
 * Displayed when user is not authenticated.
 * Shows application description and call-to-action.
 */

import { MicrosoftIcon } from '../utils/icons';

const FLOW_STEPS = [
  { icon: '🌐', label: 'React App' },
  { icon: '🏢', label: 'Entra ID' },
  { icon: '🔑', label: 'Access Token' },
  { icon: '🛡️', label: 'Express API' },
];

export default function LandingPage({ onLogin, isLoading }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* ── Tech Stack Badge ── */}
      <div className="mb-6 inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-sm px-4 py-1.5 rounded-full">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        Microsoft Entra ID + React Vite + Express
      </div>

      {/* ── Heading ── */}
      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
        Full-Stack Auth Demo
      </h1>

      {/* ── Description ── */}
      <p className="text-gray-400 text-lg mb-10 max-w-lg">
        JWT-protected Express API with Microsoft Entra ID authentication via MSAL.
        PKCE flow, silent token refresh, and audience validation.
      </p>

      {/* ── Call to Action ── */}
      <button
        onClick={onLogin}
        disabled={isLoading}
        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors text-base shadow-lg shadow-blue-900/30"
      >
        <MicrosoftIcon />
        {isLoading ? 'Signing in...' : 'Sign In with Microsoft'}
      </button>

      {/* ── Authentication Flow Diagram ── */}
      <div className="mt-16 flex items-center gap-3 text-sm text-gray-500">
        {FLOW_STEPS.map((step, index, arr) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{step.icon}</span>
              <span className="text-xs text-gray-500">{step.label}</span>
            </div>
            {index < arr.length - 1 && (
              <span className="text-gray-700 text-lg mb-4">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
