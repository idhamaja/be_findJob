const UserModel = require("../models/UserModel");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  },
};
