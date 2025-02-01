const UserModel = require("../models/UserModel");
const CryptoJS = require("crypto-js");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRETPW
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //login function
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
      const { password: _, ...userData } = user._doc;

      // Kirim response sukses
      res.status(200).json({ message: "Login berhasil", user: userData });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }
  },
};
