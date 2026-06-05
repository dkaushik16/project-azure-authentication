import React from 'react';
import ReactDOM from 'react-dom/client';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import App from './App.jsx';
import './index.css';

/**
 * Initialize MSAL with configuration
 * Exported for use in api.js for token acquisition
 */
export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Initialize MSAL and set up event listeners
 */
msalInstance
  .initialize()
  .then(() => {
    // Handle redirect response from Microsoft login
    // Critical for redirect flow - processes auth code exchange
    return msalInstance.handleRedirectPromise();
  })
  .then(() => {
    // Restore active account on page refresh
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }

    // Event callback for authentication events
    msalInstance.addEventCallback((event) => {
      // Keep active account in sync after every successful login
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
        msalInstance.setActiveAccount(event.payload.account);
        console.log('✅ User logged in:', event.payload.account.username);
      }
      // Log failed login attempts
      else if (event.eventType === EventType.LOGIN_FAILURE) {
        console.error('❌ Login failed:', event.error);
      }
      // Log failed token acquisition
      else if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
        console.error('❌ Token acquisition failed:', event.error);
      }
    });

    // Render React app
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('❌ MSAL initialization failed:', error);
    // Fallback error display
    document.getElementById('root').innerHTML =
      '<div style="color: red; padding: 20px;">Failed to initialize authentication. Please refresh the page.</div>';
  });