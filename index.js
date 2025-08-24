// =================== IMPORTS ===================
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const { passport } = require("./passport");
const Models = require("./moongose/model.js");

const Movie = Models.Movie;
const User = Models.User;

// =================== APP ===================
const app = express();

// =================== DATABASE ===================
mongoose.connect("mongodb://localhost:27017/movie_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// =================== MIDDLEWARE ===================
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));

// =================== LOGIN ===================
require("./auth")(app);

// =================== ROUTES ===================

// ===== 1. Registrazione nuovo utente (pubblica) =====
app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser)
      return res.status(400).send(`${req.body.Username} already exists`);

    // Hash della password
    req.body.Password = await bcrypt.hash(req.body.Password, 10);

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 2. Ottieni tutti i film (protetto) =====
app.get("/movies", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 3. Ottieni film per titolo (protetto) =====
app.get("/movies/:title", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ title: req.params.title });
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 4. Ottieni genere per nome (protetto) =====
app.get("/genres/:name", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ "genre.name": req.params.name });
    if (!movie) return res.status(404).send("Genre not found");
    res.json(movie.genre);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 5. Ottieni regista per nome (protetto) =====
app.get("/directors/:name", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ "director.name": req.params.name });
    if (!movie) return res.status(404).send("Director not found");
    res.json(movie.director);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 6. Aggiorna utente (protetto + verifica identità) =====
app.put("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) {
    return res.status(400).send("Permission denied");
  }

  try {
    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(req.body.Password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 7. Aggiungi film ai preferiti (protetto + verifica) =====
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) return res.status(400).send("Permission denied");

  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      { $addToSet: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 8. Rimuovi film dai preferiti (protetto + verifica) =====
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) return res.status(400).send("Permission denied");

  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 9. Cancella utente (protetto + verifica) =====
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) return res.status(400).send("Permission denied");

  try {
    const user = await User.findOneAndRemove({ Username: req.params.Username });
    if (!user) return res.status(404).send("User not found");
    res.send(`${req.params.Username} was deleted.`);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 10. Leggi tutti gli utenti (protetto) =====
app.get("/users", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 11. Leggi utente specifico (protetto + verifica) =====
app.get("/users/:Username", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (req.user.Username !== req.params.Username) return res.status(400).send("Permission denied");

  try {
    const user = await User.findOne({ Username: req.params.Username });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// ===== 12. Pagine statiche =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/movies-list", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "movies.html"));
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// =================== SERVER ===================
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
