const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(path.join(__dirname)));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Express.js Backend",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "🎉 API connection successful!",
    timestamp: new Date().toISOString(),
    server: "Express.js",
    proxy: "Nginx reverse proxy",
    headers: {
      userAgent: req.get("User-Agent"),
      host: req.get("Host"),
      xForwardedFor: req.get("X-Forwarded-For") || "N/A",
    },
  });
});

// Sample data endpoint
app.get("/api/data", (req, res) => {
  const sampleData = {
    project: "Nginx + Express Learning Project",
    technologies: [
      {
        name: "Nginx",
        role: "Web server & Reverse proxy",
        status: "configured",
      },
      { name: "Express.js", role: "Backend API server", status: "running" },
      { name: "Node.js", role: "JavaScript runtime", status: "active" },
      { name: "GCP", role: "Cloud infrastructure", status: "provisioned" },
      { name: "Terraform", role: "Infrastructure as Code", status: "applied" },
    ],
    stats: {
      totalRequests: Math.floor(Math.random() * 1000) + 100,
      activeConnections: Math.floor(Math.random() * 50) + 1,
      uptime: Math.floor(process.uptime()),
      memoryUsage: process.memoryUsage(),
    },
    timestamp: new Date().toISOString(),
  };

  res.json(sampleData);
});

// API endpoints list
app.get("/api", (req, res) => {
  res.json({
    message: "Nginx + Express Learning Project API",
    endpoints: [
      {
        path: "/api/health",
        method: "GET",
        description: "Health check endpoint",
      },
      { path: "/api/test", method: "GET", description: "Test API connection" },
      { path: "/api/data", method: "GET", description: "Get sample data" },
      { path: "/api", method: "GET", description: "API documentation" },
    ],
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.path,
    timestamp: new Date().toISOString(),
  });
});

// Serve the main HTML page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log("\n🚀 Express.js Backend Server Started");
  console.log(`📍 Port: ${PORT}`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
  console.log("🔄 Ready to handle API requests behind Nginx reverse proxy");
  console.log("\n📋 Available API endpoints:");
  console.log("  GET /api/health   - Health check");
  console.log("  GET /api/test     - Test connection");
  console.log("  GET /api/data     - Sample data");
  console.log("  GET /api          - API documentation");
  console.log("\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT received, shutting down gracefully");
  process.exit(0);
});
