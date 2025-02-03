const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyAuthorization,
  verifyToken,
  verifyAndAdmin,
} = require("../middleware/verifyToken");

//UPDATE USER
router.put("/:id", verifyAuthorization, userController.updateUser);

//DELETE USER
router.delete("/:id", verifyAuthorization, userController.deleteUser);

//GET USER
router.get("/:id", verifyAuthorization, userController.getUser);

//GET ALL USER
router.get("/", verifyAndAdmin, userController.getAllUsers);

module.exports = router;
