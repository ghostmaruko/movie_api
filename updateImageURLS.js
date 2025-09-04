const fs = require("fs");
const path = require("path");

// Percorso del file JSON dei film
const moviesFilePath = path.join(__dirname, "movies.json");

// URL base delle immagini sul tuo backend Heroku
const baseURL = "https://movie-api-2025-9f90ce074c45.herokuapp.com/img/";

// Leggi il JSON dei film
let movies = JSON.parse(fs.readFileSync(moviesFilePath, "utf-8"));

// Aggiorna imageURL per ogni film
movies = movies.map((movie) => {
  return {
    ...movie,
    imageURL: baseURL + movie.imageURL,
  };
});

// Salva su un nuovo file (puoi sovrascrivere quello vecchio se vuoi)
fs.writeFileSync(
  path.join(__dirname, "movies_with_full_img_url.json"),
  JSON.stringify(movies, null, 2),
  "utf-8"
);

console.log("imageURL aggiornati con successo!");
