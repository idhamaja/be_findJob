const UserModel = require("../models/UserModel");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRETPW
      ).toString();
    }

    try {
      const updateUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { password, __v, createdAt, ...others } = updateUser._doc;

      console.log(others);

      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //DELETE FUNCTION
  deleteUser: async (req, res) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Account SUCCESSFULLY DELETED BOSS!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET FUNCTION
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GET ALL FUNCTION
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await UserModel.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
