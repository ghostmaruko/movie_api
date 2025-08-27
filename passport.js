const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const Models = require("./moongose/model.js");
const bcrypt = require("bcryptjs");

const Users = Models.User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Chiave segreta condivisa
const JWT_SECRET = "your_jwt_secret";

// ===== Local Strategy =====
/* passport.use(
  new LocalStrategy(
    { usernameField: "Username", passwordField: "Password" },
    async (username, password, done) => {
      try {
        const user = await Users.findOne({ Username: username });
        if (!user) return done(null, false, { message: "Incorrect username or password." });

        const isValid = await bcrypt.compare(password, user.Password);
        if (!isValid) return done(null, false, { message: "Incorrect username or password." });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
); */


passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            return callback(null, false, {
              message: "Incorrect username or password.",
            });
          }
          if (!user.validatePassword(password)) {
            console.log("incorrect password");
            return callback(null, false, { message: "Incorrect password." });
          }
          console.log("finished");
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

// ===== JWT Strategy =====
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await Users.findById(jwtPayload._id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = { passport, JWT_SECRET };
