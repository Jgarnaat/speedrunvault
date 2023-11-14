const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// User registration
router.post("/register", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(201).json(userData);
    });
  } catch (err) {
    res.status(400).json({ error: "Bad Request", message: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ where: { username } });

    if (!userData) {
      res
        .status(401)
        .json({
          error: "Unauthorized",
          message: "Incorrect username or password",
        });
      return;
    }

    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      res
        .status(401)
        .json({
          error: "Unauthorized",
          message: "Incorrect username or password",
        });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// User logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
