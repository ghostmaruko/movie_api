const express = require("express");
const morgan = require("morgan");
const app = express();

// Middleware to log requests
app.use(morgan("common"));

// serve static files from the 'public' directory
app.use(express.static("public"));

let topMovies = [
  { id: 0, title: "The Lord of the Rings", year: 2001 },
  { id: 1, title: "The Matrix", year: 1999 },
  { id: 2, title: "Inception", year: 2010 },
  { id: 3, title: "Interstellar", year: 2014 },
  { id: 4, title: "The Dark Knight", year: 2008 },
  { id: 5, title: "Pulp Fiction", year: 1994 },
  { id: 6, title: "Forrest Gump", year: 1994 },
  { id: 7, title: "Star Wars: Episode IV", year: 1977 },
  { id: 8, title: "Fight Club", year: 1999 },
  { id: 9, title: "The Godfather", year: 1972 },
];

// Rotta root
app.get("/", (req, res) => {
  res.send("Welcome to the Movie API!");
});

//Route / movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/* app.get("/error", (req, res) => {
  throw new Error("Errore di test!");
}); */
