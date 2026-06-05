/**
 * Token Modal Component
 * 
 * Modal dialog for displaying and copying the JWT access token
 */

export default function TokenModal({ token, copied, onClose, onCopy }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <h3 className="font-semibold text-white">Access Token (JWT)</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Paste at{' '}
              <a
                href="https://jwt.ms"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                jwt.ms
              </a>{' '}
              to inspect decoded claims
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-6 space-y-4">
          <textarea
            readOnly
            value={token}
            className="w-full h-40 bg-gray-950 border border-gray-800 text-green-400 text-xs font-mono rounded-lg p-3 resize-none focus:outline-none"
          />
          <button
            onClick={onCopy}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {copied ? '✅ Copied!' : 'Copy Token'}
          </button>
        </div>
      </div>
    </div>
  );
}
