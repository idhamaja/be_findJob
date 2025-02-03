const router = require("express").Router();
const jobController = require("../controllers/jobController");
const {
  verifyAuthorization,
  verifyToken,
  verifyAndAdmin,
} = require("../middleware/verifyToken");

//POST JOB
router.post("/", verifyAndAdmin, jobController.createJob);

//UPDATE JOB
router.put("/:id", verifyAndAdmin, jobController.updateJob);

//DELETE JOB
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);

//GET JOB
router.get("/:id", jobController.getJob);

//GET ALL JOB
router.get("/", jobController.getAllJobs);

//SEARCH JOB by KEY
router.get("/search/:key", jobController.searchJobs);

module.exports = router;
