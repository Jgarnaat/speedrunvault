const router = require("express").Router();
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");

router.use("/blogs", blogRoutes);
router.use("/comment", commentRoutes);
router.use("/users", userRoutes);

module.exports = router;
