// Movie API - index.js
// This file sets up the Express server and defines the API endpoints for the movie database.

const mongoose = require("mongoose");
// Importing the models
const Models = require("./moongose/model.js");
const Movie = Models.Movie;
const User = Models.User;

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/movie_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(morgan("common"));
app.use(express.json()); // per leggere i body JSON
app.use(express.static("public"));


// === Rotte API MongoDB ===

// 1. Lista di tutti i film
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 2. Dati di un film per titolo
app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await Movie.findOne({ title: req.params.title });
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 3. Dati di un genere per nome
app.get("/genres/:name", async (req, res) => {
  try {
    const movie = await Movie.findOne({ genre: req.params.name });
    if (!movie) return res.status(404).send("Genre not found");
    res.json({ genre: movie.genre, description: movie.description });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 4. Dati di un regista per nome
app.get("/directors/:name", async (req, res) => {
  try {
    const movie = await Movie.findOne({ "director.name": req.params.name });
    if (!movie) return res.status(404).send("Director not found");
    res.json(movie.director);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 5. Registrazione nuovo utente
app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser) return res.status(400).send(`${req.body.Username} already exists`);

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 6. Aggiornare utente
app.put("/users/:Username", async (req, res) => {
  try {
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

// 7. Aggiungere un film ai preferiti
app.post("/users/:Username/movies/:MovieID", async (req, res) => {
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

// 8. Rimuovere un film dai preferiti
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
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

// 9. Cancellare utente
app.delete("/users/:Username", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ Username: req.params.Username });
    if (!user) return res.status(404).send("User not found");
    res.send(`${req.params.Username} was deleted.`);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 10. Read all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// 11. Read a specific user
app.get("/users/:Username", async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

// === PAGINE HTML ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/movies-list", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "movies.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});