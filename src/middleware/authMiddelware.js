import jwt from "jsonwebtoken";
import { findUserById } from "../services/userService.js";
const authMiddelware = async (req, res, next) => {
  // console.log("AUTH HIT");
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "No token provided",
      });
    }
    let token;
    if (authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await findUserById(decode.userId);
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default authMiddelware;
