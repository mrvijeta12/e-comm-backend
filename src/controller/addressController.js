//! get address data

import {
  deleteAddress,
  getAddress,
  getAllAddresses,
  updateAddress,
} from "../services/addressService.js";

//! get all address
export const getAllAddressesController = async (req, res) => {
  try {
    const addresses = await getAllAddresses();
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

//! get address data
export const getAddressesController = async (req, res) => {
  const id = req.params.id;

  try {
    const address = await getAddress(id);
    return res.status(200).json({
      status: true,
      message: "Addresses fetched successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

//! update address

export const updateAddressesController = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const address = await updateAddress(id, updatedData);
    return res.status(200).json({
      status: true,
      message: "Addresses updated successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

//! delete address

export const deleteAddressesController = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  // console.log(id);

  try {
    const address = await deleteAddress(id, userId);
    return res.status(200).json({
      status: true,
      message: "Addresses deleted successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
