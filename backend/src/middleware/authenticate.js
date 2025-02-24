import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      throw {
        statusCode: 401,
        name: "Unauthorized",
        message: "Access denied. Please login again.",
      };
    }

    const token = bearer.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(`Error: ${error} - Message: ${error.message}`);
    if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.name = "InvalidToken";
      error.message = "Invalid token. Please login again.";
    }
    if (error.name === "TokenExpiredError") {
      error.name = "TokenExpired";
      error.statusCode = 401;
      error.message = "Token expired. Please login again.";
    }
    next(error);
  }
};

export default authenticate;
