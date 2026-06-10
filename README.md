# Azure Entra ID Authentication Demo

A **full-stack authentication application** demonstrating Microsoft Entra ID (Azure AD) integration with a React frontend and Express backend. This project showcases JWT-protected API endpoints, PKCE flow, and silent token refresh.

---

## 🎯 Project Overview

This application demonstrates a complete authentication workflow where:
- Users authenticate via **Microsoft Entra ID** using a redirect flow
- Frontend obtains **JWT access tokens** from Microsoft
- Backend validates tokens and protects API endpoints
- Tokens are silently refreshed before expiry
- Separate public and protected endpoints

### Key Features
✅ Microsoft Entra ID (Azure AD) integration  
✅ PKCE authorization flow with redirect  
✅ JWT token validation on backend  
✅ Silent token refresh  
✅ Public and protected API endpoints  
✅ API testing dashboard  
✅ Token inspection tool  
✅ Modular, scalable architecture  

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Browser                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │            React Frontend                    │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │  - App.jsx (orchestration)                       │   │    │
│  │  │  - Dashboard (API testing)                       │   │    │
│  │  │  - useAuth hook (auth state)                     │   │    │
│  │  │  - authService (login/logout logic)              │   │    │
│  │  │  - apiService (API calls with tokens)            │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                    │
│              ┌───────────────┼───────────────┐                   │
│              │               │               │                   │
│              ▼               ▼               ▼                   │
│    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│    │ Microsoft    │ │  Backend     │ │  Backend     │           │
│    │  Entra ID    │ │ JWT Validate │ │  Public API  │           │
│    │  (Login)     │ │ (Protected)  │ │  (Public)    │           │
│    └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Express Server  │
                    │   (Port 5000)    │
                    │                  │
                    │  /api/public     │
                    │  /api/users      │
                    │  /api/products   │
                    │  /api/dashboard  │
                    └──────────────────┘
```

---

## 🔐 Authentication Flow

### Step 1: User Initiates Login
```
User clicks "Sign In with Microsoft"
            │
            ▼
Frontend calls: instance.loginRedirect(loginRequest)
```

### Step 2: Microsoft Authentication
```
User redirected to Microsoft Entra ID
           │
           ▼
User enters credentials
           │
           ▼
Microsoft validates and generates auth code
```

### Step 3: Authorization Code Exchange
```
Browser redirected back to app with auth code
           │
           ▼
handleRedirectPromise() processes auth code
           │
           ▼
Auth code exchanged for:
  - Access Token (JWT)
  - Refresh Token
  - ID Token
```

### Step 4: Token Storage & API Calls
```
Tokens stored in sessionStorage
           │
           ▼
Frontend calls API with: Authorization: Bearer <access_token>
           │
           ▼
Backend receives request
           │
           ▼
JWT Middleware validates token:
  - Signature verification (using Microsoft's JWKS)
  - Issuer validation
  - Audience validation
  - Expiry check
           │
           ▼
If valid: Return protected data
If invalid: Return 401 Unauthorized
```

### Step 5: Silent Token Refresh
```
Before token expires:
           │
           ▼
acquireTokenSilent() called
           │
           ▼
If token in cache and valid: Use cached token
If token expired: Use refresh token to get new access token
           │
           ▼
New token used for subsequent API calls
```

---

## 📁 Project Structure

```
project-azure-authentication/
│
├── frontend/                          # React + Vite application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx               # Main orchestration component
│   │   │   ├── NavBar.jsx            # Navigation bar
│   │   │   ├── LandingPage.jsx       # Unauthenticated view
│   │   │   ├── Dashboard.jsx         # Authenticated view - API testing
│   │   │   ├── EndpointCard.jsx      # Reusable endpoint card
│   │   │   ├── TokenModal.jsx        # Token inspection modal
│   │   │   └── FlowInfo.jsx          # Flow documentation
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js        # Auth logic (login, logout)
│   │   │   └── apiService.js         # API communication
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js            # Custom auth hook
│   │   │
│   │   ├── constants/
│   │   │   ├── endpoints.js          # API endpoints
│   │   │   └── apiEndpoints.js       # Test endpoint definitions
│   │   │
│   │   ├── utils/
│   │   │   └── icons.jsx             # Icon components
│   │   │
│   │   ├── authConfig.js             # MSAL configuration
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   │
│   ├── .env                          # Environment variables (git ignored)
│   ├── .env.example                  # Environment template (pushed to git)
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Express API server
│   ├── src/
│   │   ├── config/
│   │   │   └── authConfig.js         # Centralized configuration
│   │   │
│   │   ├── middleware/
│   │   │   ├── jwtMiddleware.js      # JWT validation
│   │   │   └── errorHandler.js       # Error handling
│   │   │
│   │   ├── routes/
│   │   │   ├── publicRoutes.js       # Public endpoints
│   │   │   └── protectedRoutes.js    # Protected endpoints
│   │   │
│   │   ├── controllers/
│   │   │   ├── publicController.js   # Public endpoint logic
│   │   │   └── protectedController.js # Protected endpoint logic
│   │   │
│   │   ├── utils/
│   │   │   └── logger.js             # Logging utility
│   │   │
│   │   └── server.js                 # Express app setup
│   │
│   ├── .env                          # Environment variables (git ignored)
│   ├── .env.example                  # Environment template (pushed to git)
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore                        # Root-level git ignore (covers both frontend/backend)
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **Microsoft Entra ID** tenant with registered applications

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-azure-authentication
```

#### 2. Frontend Setup

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Edit .env with your values
# VITE_AZURE_CLIENT_ID=<your-client-id>
# VITE_AZURE_TENANT_ID=<your-tenant-id>
# VITE_AZURE_REDIRECT_URI=http://localhost:5173

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

#### 3. Backend Setup

```bash
cd ../backend

# Copy environment template
cp .env.example .env

# Edit .env with your values
# TENANT_ID=<your-tenant-id>
# API_CLIENT_ID=<your-api-client-id>
# PORT=5000

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will be available at: **http://localhost:5000**

---

## 🔑 Environment Configuration

### Frontend (.env.example)
```env
# Azure AD Configuration
VITE_AZURE_CLIENT_ID=<your-client-id>
VITE_AZURE_TENANT_ID=<your-tenant-id>
VITE_AZURE_REDIRECT_URI=http://localhost:5173
VITE_AZURE_POST_LOGOUT_REDIRECT_URI=http://localhost:5173

# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=EntraDemo
VITE_LOG_LEVEL=Info
```

### Backend (.env.example)
```env
# Azure AD Configuration
TENANT_ID=<your-tenant-id>
API_CLIENT_ID=<your-api-client-id>

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 📡 API Endpoints

### Public Endpoints (No Authentication Required)

#### GET `/api/public`
Returns public API status.

**Response:**
```json
{
  "message": "This is a public endpoint — no token required.",
  "timestamp": "2024-06-05T10:30:00.000Z",
  "status": "ok"
}
```

---

### Protected Endpoints (JWT Authentication Required)

All protected endpoints require the `Authorization: Bearer <token>` header.

#### GET `/api/users`
Returns a list of users.

**Request:**
```bash
curl -H "Authorization: Bearer <access_token>" http://localhost:5000/api/users
```

**Response:**
```json
{
  "message": "Users fetched successfully",
  "calledBy": "user-object-id",
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "role": "Admin",
      "department": "Engineering",
      "status": "active"
    }
  ]
}
```

#### GET `/api/products`
Returns a list of products.

**Response:**
```json
{
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 101,
      "name": "Laptop Pro X",
      "category": "Electronics",
      "price": 1299.99,
      "stock": 45
    }
  ]
}
```

#### GET `/api/dashboard`
Returns dashboard statistics and analytics.

**Response:**
```json
{
  "message": "Dashboard stats fetched successfully",
  "data": {
    "totalUsers": 1240,
    "activeUsers": 893,
    "revenue": 142580.5,
    "ordersToday": 76,
    "growthRate": "12.4%",
    "recentActivity": [...]
  }
}
```

---

## 🔍 Frontend Architecture

### Component Hierarchy
```
App (orchestration)
├── NavBar (header with auth buttons)
├── LandingPage (when not authenticated)
└── Dashboard (when authenticated)
    ├── EndpointCard (x4 - for each test endpoint)
    ├── TokenModal (token inspection)
    └── FlowInfo (educational panels)
```

### Data Flow
```
useAuth Hook
    ├── isAuthenticated (boolean)
    ├── user (account info)
    ├── isLoading (loading state)
    ├── error (formatted error)
    ├── handleLogin (triggers redirect)
    └── handleLogout (triggers logout redirect)
```

### Services

**authService.js**
- `initiateLogin()` - Start login redirect
- `initiateLogout()` - Start logout redirect
- `formatAuthError()` - Convert errors to user-friendly messages
- `isUserAuthenticated()` - Check if user is logged in

**apiService.js**
- `getAccessToken()` - Acquire token silently or from cache
- `callPublicApi()` - Call public endpoints
- `callProtectedApi()` - Call protected endpoints with token
- `fetchFromApi()` - Unified API call handler
- `formatApiError()` - Format API errors

---

## ⚙️ Backend Architecture

### Request Flow
```
HTTP Request
    │
    ▼
CORS Middleware (allow frontend origin)
    │
    ▼
Body Parser (parse JSON)
    │
    ▼
Route Handler
    │
    ├─ /api/public → publicRoutes (no JWT)
    │
    ├─ /api/users → JWT Validation → protectedRoutes
    ├─ /api/products → JWT Validation → protectedRoutes
    └─ /api/dashboard → JWT Validation → protectedRoutes
        │
        ▼
    Controller (business logic)
        │
        ▼
    Response
        │
        ▼
    Error Handler (if error occurs)
```

### Middleware Stack

**jwtMiddleware.js**
- Validates JWT signature using Microsoft's JWKS
- Verifies issuer matches tenant
- Validates audience matches API client ID
- Checks token expiry

**errorHandler.js**
- Catches all errors
- Returns standardized JSON error response
- Includes stack trace in development mode

### Controllers

**publicController.js**
- `getPublicStatus()` - Returns public endpoint status

**protectedController.js**
- `getUsers()` - Returns user list
- `getProducts()` - Returns product list
- `getDashboardStats()` - Returns dashboard analytics

---

## 🔄 Data Validation & Errors

### JWT Claims Validated
```javascript
{
  "aud": "api://1a2f2cbf-3402-4eef-b4a2-70351e21e990",  // Audience
  "iss": "https://login.microsoftonline.com/.../v2.0",   // Issuer
  "scp": "access_as_user",                                // Scope
  "oid": "user-object-id",                                // User ID
  "exp": 1234567890                                       // Expiry
}
```

### Error Responses

**401 Unauthorized (Missing/Invalid Token)**
```json
{
  "error": "Unauthorized",
  "message": "jwt malformed",
  "code": "INVALID_TOKEN"
}
```

**404 Not Found**
```json
{
  "error": {
    "message": "Route not found",
    "code": "NOT_FOUND",
    "path": "/api/unknown",
    "method": "GET"
  }
}
```

**500 Server Error**
```json
{
  "error": {
    "message": "Internal Server Error",
    "code": "INTERNAL_SERVER_ERROR",
    "stack": "... (in development only)"
  }
}
```

---

## 🛠️ Development Guide

### Adding a New Protected Endpoint

1. **Create controller method** in `backend/src/controllers/protectedController.js`:
```javascript
export const getNewData = (req, res) => {
  res.json({
    message: "New data fetched successfully",
    data: []
  });
};
```

2. **Add route** in `backend/src/routes/protectedRoutes.js`:
```javascript
router.get('/new-data', getNewData);
```

3. **Call from frontend** in `frontend/src/constants/apiEndpoints.js`:
```javascript
export const API_TEST_ENDPOINTS = [
  // ... existing endpoints
  {
    key: "newData",
    label: "New Data",
    method: "GET",
    path: "/api/new-data",
    icon: "✨",
    protected: true,
    description: "Returns new data.",
    color: "blue"
  }
];
```

---

### Adding a New Environment Variable

1. **Add to .env.example**:
```env
NEW_VAR=your_value_here
```

2. **Add to .env** (never commit):
```env
NEW_VAR=actual_value
```

3. **Use in code**:
```javascript
// Frontend (Vite)
const value = import.meta.env.VITE_NEW_VAR;

// Backend (dotenv)
const value = process.env.NEW_VAR;
```

---

## 🔒 Security Best Practices

✅ **Implemented:**
- JWT token validation on every protected request
- PKCE flow (Proof Key for Code Exchange)
- Tokens stored in sessionStorage (not localStorage)
- CORS configured to allow only frontend origin
- HTTP-only cookies not used (tokens in memory/storage)
- Silent token refresh before expiry

📋 **Additional Recommendations:**
- Use HTTPS in production (not HTTP)
- Implement rate limiting on backend
- Add request logging and monitoring
- Regularly rotate credentials
- Use Web API (for production): Store tokens in memory only
- Implement logout on all tabs simultaneously

---

## 🧪 Testing the Application

### Test Public Endpoint
```bash
curl http://localhost:5000/api/public
```

### Test Protected Endpoint (with token)
```bash
# Get token from frontend dashboard → "Inspect Access Token"
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/users
```

### Test with Invalid Token
```bash
curl -H "Authorization: Bearer invalid-token" http://localhost:5000/api/users
# Returns: 401 Unauthorized
```

---

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run build    # Prepare for production
```

---

## 🐛 Troubleshooting

### "Redirect URI mismatch" Error
**Problem:** Frontend redirect URI doesn't match Azure portal configuration
**Solution:** 
- Check `VITE_AZURE_REDIRECT_URI` in `.env`
- Verify it matches Azure portal app registration
- Ensure port 5173 is correct (or update if using different port)

### "Token validation failed" Error
**Problem:** Backend can't validate JWT token
**Solution:**
- Check `TENANT_ID` and `API_CLIENT_ID` in backend `.env`
- Ensure they match Azure portal settings
- Verify token audience in JWT claims

### "CORS error" When Calling API
**Problem:** Frontend can't access backend
**Solution:**
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env` (should be `http://localhost:5173`)
- Verify `VITE_API_BASE_URL` in frontend `.env` (should be `http://localhost:5000`)

### "Token Expired" Error
**Problem:** Access token has expired
**Solution:**
- Normally handled automatically by `acquireTokenSilent()`
- If persists, sign out and sign in again
- Check browser sessionStorage for token validity

---

## 📚 Resources

- [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/azure/active-directory/)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [Express JWT Middleware](https://github.com/auth0/express-jwt)
- [JWKS RSA](https://github.com/auth0/node-jwks-rsa)
- [JWT.ms - JWT Decoder](https://jwt.ms)

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/new-feature`
2. Make your changes following the existing code structure
3. Add comments and documentation
4. Commit with clear messages: `git commit -m "feat: add new feature"`
5. Push and create a Pull Request

---

## 📄 License

This project is provided as-is for educational and demonstration purposes.

---


**Last Updated:** June 5, 2026  
**Version:** 1.0.0
