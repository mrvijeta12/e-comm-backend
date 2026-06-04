import Address from "../models/addressModel.js";
import User from "../models/userModel.js";

export const getAllAddresses = async () => {
  return await Address.find();
};

//! update address
export const updateAddress = async (id, updatedData) => {
  const address = await Address.findById(id);
  if (!address) {
    throw new Error(`No address found.`);
  }
  return await Address.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

//! delete address
export const deleteAddress = async (id, userId) => {
  const deletedAddress = await Address.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedAddress) {
    throw new Error("No address found.");
  }

  return deletedAddress;
};

//! get address data
export const getAddress = async (id) => {
  const address = await Address.findById(id);
  if (!address) {
    throw new Error(`No address found.`);
  }
  return await Address.findById(id);
};
