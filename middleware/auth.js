const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied: No token" });
    }

    // ✅ Extract token from "Bearer TOKEN"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ❌ Still no token
    if (!token) {
      return res.status(401).json({ message: "Invalid Token Format" });
    }

    // ✅ Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or Expired Token" });
  }
};