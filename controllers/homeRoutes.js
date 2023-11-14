const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Helper function to handle errors
const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", { blogs});
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", { ...blog, logged_in: req.session.logged_in });
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [Blog],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", { ...user, logged_in: true });
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("signUp");
  }
});

module.exports = router;
