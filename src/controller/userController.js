import { findUserById, getAllUsers } from "../services/userService.js";

export const getUserProfile = async (req, res) => {
  const loggedInUser = req.user;
  // console.log("hit");

  try {
    const user = await findUserById(loggedInUser._id);
    // console.log("user found", user);

    return res.status(200).json({
      status: true,
      message: "User Fetch Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      status: true,
      message: "Users Fetched Successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
