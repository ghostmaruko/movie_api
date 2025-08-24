const express = require("express");
const jwt = require("jsonwebtoken");
const { passport, JWT_SECRET } = require("./passport");

module.exports = (app) => {
  app.use(express.json());
  const router = express.Router();
  app.use("/login", router);

  // Funzione per creare JWT
  let generateJWTToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        Username: user.Username,
        Email: user.Email,
      },
      JWT_SECRET,
      {
        subject: user.Username,
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );
  };

  // ===== POST /login =====
  router.post("/", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({ message: "Incorrect username or password.", user: user });
      }

      req.login(user, { session: false }, (error) => {
        if (error) return res.status(500).send(error);

        const token = generateJWTToken(user.toJSON());
        return res.json({ user: user, token: token });
      });
    })(req, res);
  });

  return router;
};
