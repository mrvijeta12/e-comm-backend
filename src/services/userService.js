import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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

export const findUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found with this email:", userEmail);
    }
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

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
