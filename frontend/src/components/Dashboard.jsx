
import { useState, useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { fetchFromApi, getAccessToken } from '../services/apiService';
import { API_TEST_ENDPOINTS, COLOR_MAP } from '../constants/apiEndpoints';
import EndpointCard from './EndpointCard';
import TokenModal from './TokenModal';
import FlowInfo from './FlowInfo';

export default function Dashboard() {
  const { instance, accounts } = useMsal();

  // State management for API calls
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // State management for token inspection
  const [token, setToken] = useState(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * Calls an API endpoint and updates state with result/error
   * 
   * @param {Object} endpoint - Endpoint configuration
   */
  const callEndpoint = useCallback(
    async (endpoint) => {
      setLoading((prev) => ({ ...prev, [endpoint.key]: true }));
      setErrors((prev) => ({ ...prev, [endpoint.key]: null }));
      setResults((prev) => ({ ...prev, [endpoint.key]: null }));

      try {
        const data = await fetchFromApi(
          endpoint.path,
          instance,
          accounts,
          endpoint.protected
        );
        setResults((prev) => ({ ...prev, [endpoint.key]: data }));
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [endpoint.key]: error.message,
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [endpoint.key]: false }));
      }
    },
    [instance, accounts]
  );

  /**
   * Retrieves and displays the current access token
   */
  const handleViewToken = useCallback(async () => {
    try {
      const accessToken = await getAccessToken(instance, accounts);
      setToken(accessToken);
      setShowTokenModal(true);
    } catch (error) {
      console.error('Failed to get access token:', error);
      alert('Failed to retrieve access token. Please try again.');
    }
  }, [instance, accounts]);

  /**
   * Copies token to clipboard
   */
  const handleCopyToken = useCallback(() => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [token]);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">API Playground</h2>
          <p className="text-gray-400 text-sm mt-1">
            Test your protected and public Express endpoints below.
          </p>
        </div>
        <button
          onClick={handleViewToken}
          className="flex items-center cursor-pointer gap-2 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
        >
          🔑 Inspect Access Token
        </button>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: API Endpoint Cards */}
        <div className="lg:col-span-2 space-y-4">
          {API_TEST_ENDPOINTS.map((endpoint) => (
            <EndpointCard
              key={endpoint.key}
              endpoint={endpoint}
              isLoading={loading[endpoint.key]}
              error={errors[endpoint.key]}
              result={results[endpoint.key]}
              colorMap={COLOR_MAP}
              onCall={() => callEndpoint(endpoint)}
            />
          ))}
        </div>

        {/* Right Column: Information Panels */}
        <div className="space-y-4">
          <FlowInfo />
        </div>
      </div>

      {/* ── Token Inspection Modal ── */}
      {showTokenModal && token && (
        <TokenModal
          token={token}
          copied={copied}
          onClose={() => setShowTokenModal(false)}
          onCopy={handleCopyToken}
        />
      )}
    </div>
  );
}