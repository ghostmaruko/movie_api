const mongoose = require("mongoose");
const Models = require("./moongose/model.js");
const Movie = Models.Movie;

const movies = [
  {
    title: "The Lord of the Rings",
    description: "Epic fantasy adventure based on the novel by J.R.R. Tolkien.",
    genre: { name: "Fantasy", description: "Epic fantasy adventure." },
    director: { name: "Peter Jackson", bio: "New Zealand filmmaker" },
    year: 2001,
    actors: ["Elijah Wood", "Ian McKellen"],
    imageURL: "lotr.jpg",
    featured: true,
  },
  {
    title: "The Matrix",
    description: "A hacker discovers the shocking truth about reality.",
    genre: { name: "Sci-Fi", description: "Science fiction thriller." },
    director: { name: "Lana Wachowski", bio: "American director" },
    year: 1999,
    actors: ["Keanu Reeves", "Laurence Fishburne"],
    imageURL: "matrix.jpg",
    featured: true,
  },
  {
    title: "Inception",
    description: "A skilled thief enters dreams to steal secrets.",
    genre: { name: "Sci-Fi", description: "Science fiction thriller." },
    director: { name: "Christopher Nolan", bio: "British-American filmmaker" },
    year: 2010,
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Kate Winslet"],
    imageURL: "inception.jpg",
    featured: false,
  },
  {
    title: "Star Wars: A New Hope",
    description: "A young farmer joins a rebellion against an evil empire.",
    genre: { name: "Sci-Fi", description: "Science fiction adventure." },
    director: { name: "George Lucas", bio: "American filmmaker" },
    year: 1977,
    actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    imageURL: "star_wars.jpg",
    featured: true,
  },
  {
    title: "Pulp Fiction",
    description:
      "A series of interconnected stories set in the criminal underworld of Los Angeles.",
    genre: { name: "Crime", description: "Crime drama." },
    director: {
      name: "Quentin Tarantino",
      bio: "American director and screenwriter",
    },
    year: 1994,
    actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    imageURL: "pulp_fiction.jpg",
    featured: false,
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    genre: { name: "Crime", description: "Crime drama." },
    director: { name: "Francis Ford Coppola", bio: "American filmmaker" },
    year: 1972,
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    imageURL: "the_godfather.jpg",
    featured: false,
  },
  {
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabamaan named Forrest Gump.",
    genre: { name: "Drama", description: "Drama / Romance" },
    director: { name: "Robert Zemeckis", bio: "American filmmaker" },
    year: 1994,
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    imageURL: "forrest_gump.jpg",
    featured: false,
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    genre: { name: "Action", description: "Superhero / Action" },
    director: { name: "Christopher Nolan", bio: "British-American filmmaker" },
    year: 2008,
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    imageURL: "the_dark_knight.jpg",
    featured: false,
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: { name: "Sci-Fi", description: "Science fiction adventure." },
    director: { name: "Christopher Nolan", bio: "British-American filmmaker" },
    year: 2014,
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    imageURL: "interstellar.jpg",
    featured: false,
  },
  {
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him to be a gladiator.",
    genre: { name: "Action", description: "Historical action drama." },
    director: { name: "Ridley Scott", bio: "British filmmaker" },
    year: 2000,
    actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    imageURL: "gladiator.jpg",
    featured: false,
  },
  {
    title: "The Silence of the Lambs",
    description:
      "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer.",
    genre: { name: "Thriller", description: "Psychological thriller / Crime" },
    director: { name: "Jonathan Demme", bio: "American filmmaker" },
    year: 1991,
    actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    imageURL: "silence_of_lambs.jpg",
    featured: false,
  },
];

async function populate() {
  try {
    await mongoose.connect("mongodb://localhost:27017/movie_api");
    console.log("Connected to MongoDB");

    await Movie.deleteMany();
    const result = await Movie.insertMany(movies);
    console.log(`${result.length} movies inserted!`);

    result.forEach((movie) => {
      console.log(`ID for "${movie.title}": ${movie._id}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

populate();
