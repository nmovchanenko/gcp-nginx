// DOM elements
const apiStatusElement = document.getElementById("api-status");
const apiResponseElement = document.getElementById("api-response");
const testApiButton = document.getElementById("test-api");
const getDataButton = document.getElementById("get-data");

// API base URL - will work with Nginx reverse proxy
const API_BASE = "/api";

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Frontend application loaded");
  checkApiStatus();

  // Event listeners
  testApiButton.addEventListener("click", testApiConnection);
  getDataButton.addEventListener("click", fetchSampleData);
});

// Check if the API is responsive
async function checkApiStatus() {
  try {
    apiStatusElement.textContent = "Checking...";
    apiStatusElement.className = "status-badge checking";

    const response = await fetch(`${API_BASE}/health`);

    if (response.ok) {
      const data = await response.json();
      apiStatusElement.textContent = "Active";
      apiStatusElement.className = "status-badge active";
      console.log("✅ API is healthy:", data);
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.error("❌ API health check failed:", error);
    apiStatusElement.textContent = "Inactive";
    apiStatusElement.className = "status-badge inactive";
  }
}

// Test API connection
async function testApiConnection() {
  updateApiResponse("Testing API connection...");

  try {
    const response = await fetch(`${API_BASE}/test`);
    const data = await response.json();

    if (response.ok) {
      updateApiResponse(JSON.stringify(data, null, 2), "success");
    } else {
      throw new Error(
        `HTTP ${response.status}: ${data.error || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("❌ API test failed:", error);
    updateApiResponse(`Error: ${error.message}`, "error");
  }
}

// Fetch sample data from API
async function fetchSampleData() {
  updateApiResponse("Fetching sample data...");

  try {
    const response = await fetch(`${API_BASE}/data`);
    const data = await response.json();

    if (response.ok) {
      updateApiResponse(JSON.stringify(data, null, 2), "success");
    } else {
      throw new Error(
        `HTTP ${response.status}: ${data.error || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("❌ Data fetch failed:", error);
    updateApiResponse(`Error: ${error.message}`, "error");
  }
}

// Update API response display
function updateApiResponse(message, type = "") {
  apiResponseElement.textContent = message;
  apiResponseElement.className = `api-response ${type}`;
}

// Utility function to format timestamps
function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

// Log frontend initialization
console.log("🎯 Nginx + Express Learning Project");
console.log("📄 Frontend: Static files served by Nginx");
console.log("🔄 Backend: Express.js API behind reverse proxy");
console.log("☁️ Infrastructure: GCP VM managed by Terraform");
