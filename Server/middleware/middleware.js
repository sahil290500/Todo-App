import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    console.log("inside middleware");

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, "sahil@290500");
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Invalid token, authorization denied",
      });
    }
    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found, authorization denied",
      });
    }
    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Token not found ,please login" });
  }
};

export default middleware;
