import {
  findUserById,
  getAllUsers,
  getUserAddresses,
} from "../services/userService.js";

//! get user profile by id
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

//! get all users
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

//! get user addresses

export const getUserAddressesController = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  try {
    const addresses = await getUserAddresses(id);
    return res.status(200).json({
      status: true,
      message: "Addresses fetched successfully",
      addresses,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
