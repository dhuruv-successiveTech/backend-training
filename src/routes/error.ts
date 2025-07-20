import express from "express";

const errorRoute = express.Router();

const throwError = (message: string, statusCode: number) => {
  const err = new Error(message) as Error & { statusCode: number };
  err.statusCode = statusCode;
  throw err;
};

// async error
errorRoute.post("/async-route", async (req, res, next) => {
  try {
    throw new Error("async route error");
  } catch (error) {
    next(error);
  }
});

// 400 - Bad Request
errorRoute.post("/bad-request", (req, res) => {
  if (!req.body.name) {
    throwError("Name is required", 400);
  }
});

// 401 - Unauthorized
errorRoute.post("/unauthorized", (req, res) => {
  throwError("Unauthorized access", 401);
});

// 403 - Forbidden
errorRoute.post("/forbidden", (req, res) => {
  throwError("Access forbidden", 403);
});

// 404 - Not Found
errorRoute.post("/not-found", (req, res) => {
  throwError("Resource not found", 404);
});

//429 - TO many request
errorRoute.post("/too-many-req", (req, res) => {
  throwError("Too many requests", 429);
});

// 500 - Internal Server Error
errorRoute.post("/internalError", (req, res) => {
  throwError("Internal server error", 500);
});

// 501 - Not Implemented
errorRoute.post("/not-implemented", (req, res) => {
  throwError("Not implemented", 501);
});

// 503 - Service Unavailable
errorRoute.post("/unavailable", (req, res) => {
  throwError("Service temporarily unavailable", 503);
});

export { errorRoute };
