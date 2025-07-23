import express from "express";

const errorRoute = express.Router();

// async error
errorRoute.post("/custom-error", async (req, res, next) => {
  try {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        reject(new Error("async route error"));
      }, 1000)
    );
  } catch (error) {
    next(error);
  }
});

// 400 - Bad Request
errorRoute.post("/bad-request", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
});

// 401 - Unauthorized
errorRoute.post("/unauthorized", (req, res) => {
  return res.status(401).json({
    message: "Unauthorized access",
  });
});

// 403 - Forbidden
errorRoute.post("/forbidden", (req, res) => {
  return res.status(403).json({
    message: "Access forbidden",
  });
});

// 404 - Not Found
errorRoute.post("/not-found", (req, res) => {
  return res.status(404).json({
    message: "Resource not found",
  });
});

//429 - TO many request
errorRoute.post("/too-many-req", (req, res) => {
  return res.status(429).json({
    message: "Too many requests",
  });
});

// 500 - Internal Server Error
errorRoute.post("/internalError", (req, res) => {
  return res.status(500).json({
    message: "Internal server error",
  });
});

// 501 - Not Implemented
errorRoute.post("/not-implemented", (req, res) => {
  return res.status(501).json({
    message: "Not implemented",
  });
});

// 503 - Service Unavailable
errorRoute.post("/unavailable", (req, res) => {
  return res.status(503).json({
    message: "Service temporarily unavailable",
  });
});

export { errorRoute };
