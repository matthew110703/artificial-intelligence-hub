const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const error = err.name || "Internal Server Error";
  const message = err.message || "Please try again later.";

  if (process.env.NODE_ENV === "development") {
    console.error(`Error: ${error} - Message: ${message}`);
  }

  return res.status(statusCode).json({
    errorCode: statusCode,
    error,
    message,
  });
};

export default errorHandler;
