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
    throw error;
  }
});

export { errorRoute };
