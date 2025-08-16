const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");

app.use(morgan("common"));
app.use(express.json()); // per leggere i body JSON
app.use(express.static("public"));

// === Dati fittizi (in-memory) ===
let topMovies = [
  {
    id: 0,
    title: "The Lord of the Rings",
    year: 2001,
    description: "Epic fantasy adventure based on the novel by J.R.R. Tolkien.",
    genre: "Fantasy",
    director: { name: "Peter Jackson", birth: 1961, death: null },
    imageURL: "/img/lotr.jpg",
    featured: true,
  },
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    description: "A hacker discovers the shocking truth about reality.",
    genre: "Sci-Fi",
    director: { name: "Lana Wachowski", birth: 1965, death: null },
    imageURL: "/img/matrix.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    description: "A skilled thief enters dreams to steal secrets.",
    genre: "Sci-Fi",
    director: { name: "Christopher Nolan", birth: 1970, death: null },
    imageURL: "/img/inception.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Star Wars: A New Hope",
    year: 1977,
    description: "A young farmer joins a rebellion against an evil empire.",
    genre: "Sci-Fi",
    director: { name: "George Lucas", birth: 1944, death: null },
    imageURL: "/img/star_wars.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    description:
      "A series of interconnected stories set in the criminal underworld of Los Angeles.",
    genre: "Crime",
    director: { name: "Quentin Tarantino", birth: 1963, death: null },
    imageURL: "/img/pupl_fiction.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "The Godfather",
    year: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    genre: "Crime",
    director: { name: "Francis Ford Coppola", birth: 1939, death: null },
    imageURL: "/img/The_Godfather.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Forrest Gump",
    year: 1994,
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabamaan named Forrest Gump.",
    genre: "Drama",
    director: { name: "Robert Zemeckis", birth: 1951, death: null },
    imageURL: "/img/forrest_gumps.jpg",
    featured: false,
  },
  {
    id: 7,
    title: "The Dark Knight",
    year: 2008,
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    genre: "Action",
    director: { name: "Christopher Nolan", birth: 1970, death: null },
    imageURL: "/img/the_dark_knight.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Interstellar",
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    director: { name: "Christopher Nolan", birth: 1970, death: null },
    imageURL: "/img/interstellar.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Gladiator",
    year: 2000,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him to be a gladiator.",
    genre: "Action",
    director: { name: "Ridley Scott", birth: 1937, death: null },
    imageURL: "/img/gladiator.jpg",
    featured: false,
  },
  {
    id: 10,
    title: "The Silence of the Lambs",
    year: 1991,
    description:
      "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer.",
    genre: "Thriller",
    director: { name: "Jonathan Demme", birth: 1944, death: 2017 },
    imageURL: "/img/silcence_of_lambs.jpg",
    featured: false,
  },
];

let users = [
  { username: "marco", favorites: [] },
  { username: "anna", favorites: [] },
];

// === Rotte richieste dalla task ===

// Root
/* app.get("/", (req, res) => {
  res.send("Welcome to the Movie API!");
}); */

// 1. Lista di tutti i film
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// 2. Dati di un film per titolo
app.get("/movies/:title", (req, res) => {
  const movie = topMovies.find((m) => m.title === req.params.title);
  if (movie) res.json(movie);
  else res.status(404).send("Movie not found");
});

// 3. Dati di un genere per nome
app.get("/genres/:name", (req, res) => {
  const movie = topMovies.find(
    (m) => m.genre.toLowerCase() === req.params.name.toLowerCase()
  );
  if (movie) {
    res.json({ genre: movie.genre, description: movie.description });
  } else {
    res.status(404).send("Genre not found");
  }
});

// 4. Dati di un regista per nome
app.get("/directors/:name", (req, res) => {
  const movie = topMovies.find(
    (m) => m.director.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (movie) {
    res.json(movie.director);
  } else {
    res.status(404).send("Director not found");
  }
});

// 5. Registrazione nuovo utente
app.post("/users", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send("Username is required");
  if (users.find((u) => u.username === username))
    return res.status(400).send("Username already exists");

  users.push({ username, favorites: [] });
  res.status(201).send(`User ${username} registered`);
});

// 6. Aggiornare username
app.put("/users/:username", (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).send("User not found");

  const { newUsername } = req.body;
  if (!newUsername) return res.status(400).send("New username is required");

  user.username = newUsername;
  res.send(`Username updated to ${newUsername}`);
});

// 7. Aggiungere un film ai preferiti
app.post("/users/:username/movies/:movieID", (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).send("User not found");

  const movie = topMovies.find((m) => m.id == req.params.movieID);
  if (!movie) return res.status(404).send("Movie not found");

  if (!user.favorites.includes(movie.id)) {
    user.favorites.push(movie.id);
  }
  res.send(`Movie ${movie.title} added to ${user.username}'s favorites`);
});

// 8. Rimuovere un film dai preferiti
app.delete("/users/:username/movies/:movieID", (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).send("User not found");

  user.favorites = user.favorites.filter((id) => id != req.params.movieID);
  res.send(
    `Movie ${req.params.movieID} removed from ${user.username}'s favorites`
  );
});

// 9. Cancellare utente
app.delete("/users/:username", (req, res) => {
  users = users.filter((u) => u.username !== req.params.username);
  res.send(`User ${req.params.username} has been removed`);
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
