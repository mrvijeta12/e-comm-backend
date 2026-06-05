import { createUser, findUserByEmail } from "../services/userService.js";
import { generateToken } from "../config/jwtProvider.js";
import bcrypt from "bcrypt";
import { createCart } from "../services/cartService.js";
import mongoose from "mongoose";

//! signup user
export const register = async (req, res) => {
  // console.log("hit");

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await createUser(req.body, session);
    // console.log("user", user);

    await createCart(user._id, session);

    await session.commitTransaction();
    session.endSession();
    const token = await generateToken(user._id);
    return res
      .cookie("token", token, {
        httpOnly: true, // prevent js to access token as fe does not get it .
        secure: true, // make it true when run in https on http keep if false
        sameSite: "strict", // work on same site not when user click through other site
      })
      .status(201)
      .json({
        status: true,
        message: "User created successfully",

        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! login user
export const login = async (req, res) => {
  // console.log("hit");

  const { password, email } = req.body;

  try {
    const user = await findUserByEmail(email);
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email: ${email}`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: `Invalid Password`,
      });
    }

    const token = await generateToken(user._id);

    // console.log(user);

    return res
      .cookie("token", token, {
        httpOnly: true, // prevent js to access token as fe does not get it .
        secure: true, // make it true when run in https
        sameSite: "strict", // work on same site not when user click through other site
      })
      .status(200)
      .json({
        status: true,
        message: `User login successfully`,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error while login: ${error.message}`,
    });
  }
};
