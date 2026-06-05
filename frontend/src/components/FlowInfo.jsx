const FLOW_STEPS = [
  {
    n: '1',
    title: 'Login (Redirect)',
    desc: 'MSAL redirects user to Microsoft login. Auth code is exchanged for tokens.',
  },
  {
    n: '2',
    title: 'Token Cached',
    desc: 'Access token stored in sessionStorage. Silently refreshed before expiry.',
  },
  {
    n: '3',
    title: 'Bearer Header',
    desc: 'acquireTokenSilent() gets token → sent as Authorization: Bearer <jwt>.',
  },
  {
    n: '4',
    title: 'JWT Validation',
    desc: 'Express fetches Microsoft JWKS public keys and verifies signature, issuer & audience.',
  },
  {
    n: '5',
    title: 'Response / 401',
    desc: 'Valid token → data returned. Missing/invalid → 401 Unauthorized.',
  },
];

const JWT_CLAIMS = [
  { claim: 'aud', value: 'api://1a2f2cbf…' },
  { claim: 'iss', value: 'login.microsoftonline.com/…' },
  { claim: 'scp', value: 'access_as_user' },
  { claim: 'oid', value: 'User object ID in tenant' },
  { claim: 'exp', value: 'Expiry (Unix timestamp)' },
];

export default function FlowInfo() {
  return (
    <div className="space-y-4">
      {/* ── How It Works ── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4">How It Works</h3>
        <ol className="space-y-4">
          {FLOW_STEPS.map((step) => (
            <li key={step.n} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 border border-blue-600/40 text-blue-400 text-xs flex items-center justify-center font-semibold">
                {step.n}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-200">{step.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{step.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── JWT Claims ── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4">JWT Claims Validated</h3>
        <div className="space-y-2">
          {JWT_CLAIMS.map((c) => (
            <div key={c.claim} className="flex items-center gap-2 text-xs">
              <code className="bg-gray-800 text-blue-400 px-2 py-0.5 rounded font-mono w-12 text-center shrink-0">
                {c.claim}
              </code>
              <span className="text-gray-500">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
