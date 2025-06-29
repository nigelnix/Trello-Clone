import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Don't forget the `.js` extension with ES Modules

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ Always return or the function continues
    } catch (err) {
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ msg: "Not authorized, no token" }); // ✅ return ensures function stops here
};

export default protect;
