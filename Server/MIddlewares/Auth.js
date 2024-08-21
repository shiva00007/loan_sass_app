const jwt = require("jsonwebtoken");

// To check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  //To  get the authization header
  const authHeader = req.headers["authorization"];

  // If the 'authorization' header is not present, return  error
  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  try {
    // Verify JWT Token
    const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);

    // to attach with the user
    req.user = decodedToken;

    next();
  } catch (err) {
    // If token verification fails, return a 403 error
    return res.status(403).json({
      message: "Unauthorized, JWT token is invalid or expired",
    });
  }
};

// Export the isAuthenticated middleware function
module.exports = isAuthenticated;
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // Extract the 'authorization' header from the incoming request
  const authHeader = req.headers["authorization"];

  // If the 'authorization' header is not present, return a 403 error
  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  try {
    // Verify the JWT token using the secret key stored in environment variables
    const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object for further use
    req.user = decodedToken;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 403 error
    return res.status(403).json({
      message: "Unauthorized, JWT token is invalid or expired",
    });
  }
};

// Export the isAuthenticated middleware function
module.exports = isAuthenticated;
