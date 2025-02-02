const UserModel = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRETPW
      ).toString(),
      // Tidak perlu menyertakan skills jika tidak ada data
    });

    try {
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ savedUser, message: "User created successfully BOSS!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Login function
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Cari user berdasarkan email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      // Decrypt password yang tersimpan di database
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRETPW
      ).toString(CryptoJS.enc.Utf8);

      // Bandingkan password yang diinput dengan password yang didecrypt
      if (decryptedPassword !== password) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      // Hapus password dari response untuk keamanan
      const { password: __v, createdAt, ...others } = user._doc;

      // TOKEN JWT
      const userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isAgent: user.isAgent,
        },
        process.env.JWT_SEC,
        { expiresIn: "21d" }
      );

      // Kirim response sukses
      res.status(200).json({ ...others, userToken });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }
  },
};