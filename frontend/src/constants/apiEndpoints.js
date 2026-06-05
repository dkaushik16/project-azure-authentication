/**
 * API Test Data - Endpoint Definitions for Dashboard
 * 
 * Defines all available API endpoints that can be tested in the dashboard,
 * including their metadata, HTTP method, and protection level.
 */

export const API_TEST_ENDPOINTS = [
  {
    key: 'public',
    label: 'Public Endpoint',
    method: 'GET',
    path: '/api/public',
    icon: '🌐',
    protected: false,
    description: 'No token required. Open to everyone.',
    color: 'green',
  },
  {
    key: 'users',
    label: 'Users',
    method: 'GET',
    path: '/api/users',
    icon: '👥',
    protected: true,
    description: 'Returns a list of dummy users.',
    color: 'blue',
  },
  {
    key: 'products',
    label: 'Products',
    method: 'GET',
    path: '/api/products',
    icon: '📦',
    protected: true,
    description: 'Returns a list of dummy products.',
    color: 'purple',
  },
  {
    key: 'dashboard',
    label: 'Dashboard Stats',
    method: 'GET',
    path: '/api/dashboard',
    icon: '📊',
    protected: true,
    description: 'Returns analytics and recent activity.',
    color: 'amber',
  },
];

export const COLOR_MAP = {
  green: {
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    btn: 'bg-green-600 hover:bg-green-500',
    dot: 'bg-green-400',
  },
  blue: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    btn: 'bg-blue-600 hover:bg-blue-500',
    dot: 'bg-blue-400',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    btn: 'bg-purple-600 hover:bg-purple-500',
    dot: 'bg-purple-400',
  },
  amber: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    btn: 'bg-amber-600 hover:bg-amber-500',
    dot: 'bg-amber-400',
  },
};

export default API_TEST_ENDPOINTS;
