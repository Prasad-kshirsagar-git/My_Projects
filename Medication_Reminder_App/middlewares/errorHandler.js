// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Set default error status and message
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Log the error details (optional for debugging purposes)
  console.error(`[Error] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // If the client accepts JSON, return JSON response
  if (req.headers["content-type"] === "application/json" || req.xhr) {
    return res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // For non-JSON requests, render an error page or send error details in the browser
  if (process.env.NODE_ENV === "development") {
    // In development, send full error details to the browser
    res.status(statusCode).send(`
      <h1>Error ${statusCode}</h1>
      <p>${message}</p>
      <pre>${err.stack}</pre>
    `);
  } else {
    // In production, show a generic error page
    res.status(statusCode).render("error/error", {
      pageTitle: "Error",
      statusCode,
      message: "Something went wrong. Please try again later.",
      stack: undefined,
    });
  }
};

module.exports = errorHandler;
