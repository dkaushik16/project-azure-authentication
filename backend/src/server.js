import express from "express";
import cors from "cors";

// Configuration imports
import { corsConfig, serverConfig, jwtConfig } from "./config/authConfig.js";

// Middleware imports
import {
  createJwtMiddleware,
  jwtErrorHandler,
} from "./middleware/jwtMiddleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// Route imports
import publicRoutes from "./routes/publicRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

// Utility imports
import { logger } from "./utils/logger.js";

// ────────────────────────────────────────────────────────────────────────────
// Initialize Express App
// ────────────────────────────────────────────────────────────────────────────

const app = express();

// ────────────────────────────────────────────────────────────────────────────
// Global Middleware
// ────────────────────────────────────────────────────────────────────────────

// CORS middleware - allows requests from frontend
app.use(cors(corsConfig));

// JSON body parser
app.use(express.json());

// Request logging in development
if (serverConfig.isDevelopment) {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });
}

// ────────────────────────────────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────────────────────────────────

// Public routes (no authentication required)
app.use("/api", publicRoutes);

// JWT validation middleware for protected routes
const checkJwt = createJwtMiddleware();

// Protected routes (requires valid JWT token)
app.use("/api", checkJwt, protectedRoutes);

// JWT error handler
app.use(jwtErrorHandler);

// ────────────────────────────────────────────────────────────────────────────
// Error Handling
// ────────────────────────────────────────────────────────────────────────────

// 404 Not Found handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ────────────────────────────────────────────────────────────────────────────
// Start Server
// ────────────────────────────────────────────────────────────────────────────

app.listen(serverConfig.port, () => {
  logger.success(
    `Express API running at http://localhost:${serverConfig.port}`,
  );
  logger.info(`🔐 JWT validation enabled`, {
    tenant: jwtConfig.tenantId,
    audience: jwtConfig.audience[1],
  });
  logger.info(`📋 Routes available:`, {
    "GET /api/public": "Public endpoint (no auth)",
    "GET /api/users": "Protected - requires JWT",
    "GET /api/products": "Protected - requires JWT",
    "GET /api/dashboard": "Protected - requires JWT",
  });
});

export default app;
