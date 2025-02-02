const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

//UPDATE USER
router.put("/:id", verifyAuthorization, userController.updateUser);

//DELETE USER
router.delete("/:id", verifyAuthorization, userController.deleteUser);

module.exports = router;
