import Address from "../models/addressModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

//! create user
export const createUser = async (userData, session) => {
  try {
    const { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email }).session(session);
    if (isUserExist) {
      throw new Error(`User already exist with email: ${email}`);
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create(
      [
        {
          firstName,
          lastName,
          email,
          password: hashPassword,
        },
      ],
      { session },
    );
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

//! find user by id
export const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("User not found with this id:", userId);
    }
    // console.log("user", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//! find user by email
export const findUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found with this email:", userEmail);
    }
    // console.log(user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const getUserProfileByToken = async (token) => {
//   try {
//     const userId = getUserIdFromToken(token);
//     if (!userId) {
//       throw new Error("User not found with this id:", userId);
//     }
//     return userId;
//   } catch (error) {
//     throw new Error("Error while fetching user", error.message);
//   }
// };

//! get all users
export const getAllUsers = async () => {
  // console.log("get all user hitted");

  try {
    const users = await User.find();
    // console.log("users", users);

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

//! get user address

export const getUserAddresses = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`No user found.`);
  }
  const addresses = await Address.find({ user: user._id });
  return addresses;
};
