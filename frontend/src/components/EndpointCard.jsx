/**
 * Endpoint Card Component
 * 
 * Reusable card displaying a single API endpoint with:
 * - Endpoint metadata (method, path, protection level)
 * - Call button
 * - Response display (success or error)
 */

import { SpinnerIcon } from '../utils/icons';

export default function EndpointCard({
  endpoint,
  isLoading,
  error,
  result, 
  colorMap,
  onCall,
}) {
  const colors = colorMap[endpoint.color];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
      {/* ── Card Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Endpoint Icon */}
          <span className="text-2xl">{endpoint.icon}</span>

          {/* Endpoint Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{endpoint.label}</span>
              <span className={`text-xs border px-2 py-0.5 rounded-full ${colors.badge}`}>
                {endpoint.protected ? '🔒 Protected' : '🌐 Public'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                {endpoint.method}
              </span>
              <span className="text-xs font-mono text-gray-500">{endpoint.path}</span>
            </div>
          </div>
        </div>

        {/* Call Button */}
        <button
          onClick={onCall}
          disabled={isLoading}
          className={`shrink-0 flex items-center cursor-pointer gap-2 text-sm text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${colors.btn}`}
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Calling…
            </>
          ) : (
            'Call →'
          )}
        </button>
      </div>

      {/* ── Description ── */}
      <p className="text-sm text-gray-500">{endpoint.description}</p>

      {/* ── Error Display ── */}
      {error && (
        <div className="bg-red-950/40 border border-red-800/50 rounded-lg px-4 py-3 text-sm text-red-400">
          ❌ {error}
        </div>
      )}

      {/* ── Success Response ── */}
      {result && (
        <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
            <span className="text-xs text-gray-400 font-medium">200 OK</span>
          </div>
          <pre className="text-xs text-green-300 p-4 overflow-auto max-h-64 leading-relaxed">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
