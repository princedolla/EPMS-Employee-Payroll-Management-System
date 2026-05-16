const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users(username,password) VALUES(?,?)";

    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Account Created");
    });
  } catch (error) {
    console.log(error);
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.json(err);
    }

    if (result.length === 0) {
      return res.json("User Not Found");
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json("Incorrect Password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
      username: user.username,
    });
  });
});

module.exports = router;
