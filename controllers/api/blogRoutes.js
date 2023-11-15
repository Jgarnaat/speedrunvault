const express = require("express");
const router = express.Router();
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new blog entry
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
      
    });

    res.status(201).json(newBlog); // Changed status to 201 for successful resource creation
  } catch (err) {
    res.status(400).json({ error: "Bad Request", message: err.message });
  }
});

// Delete a blog entry by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.session;

    const blogData = await Blog.destroy({
      where: {
        id,
        user_id,
      },
    });

    if (blogData === 0) {
      res
        .status(404)
        .json({ error: "Not Found", message: "Blog ID not found" });
    } else {
      res.status(204).end(); // Changed status to 204 for successful deletion without a response body
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

module.exports = router;
