const mongoose = require("mongoose");
const Models = require("./moongose/model.js");
const Movie = Models.Movie;


const movies = [
  {
    Title: "The Lord of the Rings",
    Description: "Epic fantasy adventure based on the novel by J.R.R. Tolkien.",
    Genre: { Name: "Fantasy", Description: "Epic fantasy adventure." },
    Director: { Name: "Peter Jackson", Bio: "New Zealand filmmaker" },
    Year: 2001,
    Actors: ["Elijah Wood", "Ian McKellen"],
    ImagePath: "/img/lotr.jpg",
    Featured: true,
  },
  {
    Title: "The Matrix",
    Description: "A hacker discovers the shocking truth about reality.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction thriller." },
    Director: { Name: "Lana Wachowski", Bio: "American director" },
    Year: 1999,
    Actors: ["Keanu Reeves", "Laurence Fishburne"],
    ImagePath: "/img/matrix.jpg",
    Featured: true,
  },
  {
    Title: "Inception",
    Description: "A skilled thief enters dreams to steal secrets.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction thriller." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker" },
    Year: 2010,
    Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Kate Winslet"],
    ImagePath: "/img/inception.jpg",
    Featured: false,
  },
  {
    Title: "Star Wars: A New Hope",
    Description: "A young farmer joins a rebellion against an evil empire.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction adventure." },
    Director: { Name: "George Lucas", Bio: "American filmmaker" },
    Year: 1977,
    Actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    ImagePath: "/img/star_wars.jpg",
    Featured: true,
  },
  {
    Title: "Pulp Fiction",
    Description:
      "A series of interconnected stories set in the criminal underworld of Los Angeles.",
    Genre: { Name: "Crime", Description: "Crime drama." },
    Director: {
      Name: "Quentin Tarantino",
      Bio: "American director and screenwriter",
    },
    Year: 1994,
    Actors: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    ImagePath: "/img/pulp_fiction.jpg",
    Featured: false,
  },
  {
    Title: "The Godfather",
    Description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    Genre: { Name: "Crime", Description: "Crime drama." },
    Director: { Name: "Francis Ford Coppola", Bio: "American filmmaker" },
    Year: 1972,
    Actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    ImagePath: "/img/the_godfather.jpg",
    Featured: false,
  },
  {
    Title: "Forrest Gump",
    Description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabamaan named Forrest Gump.",
    Genre: { Name: "Drama", Description: "Drama / Romance" },
    Director: { Name: "Robert Zemeckis", Bio: "American filmmaker" },
    Year: 1994,
    Actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    ImagePath: "/img/forrest_gump.jpg",
    Featured: false,
  },
  {
    Title: "The Dark Knight",
    Description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    Genre: { Name: "Action", Description: "Superhero / Action" },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker" },
    Year: 2008,
    Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ImagePath: "/img/the_dark_knight.jpg",
    Featured: false,
  },
  {
    Title: "Interstellar",
    Description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Genre: { Name: "Sci-Fi", Description: "Science fiction adventure." },
    Director: { Name: "Christopher Nolan", Bio: "British-American filmmaker" },
    Year: 2014,
    Actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    ImagePath: "/img/interstellar.jpg",
    Featured: false,
  },
  {
    Title: "Gladiator",
    Description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him to be a gladiator.",
    Genre: { Name: "Action", Description: "Historical action drama." },
    Director: { Name: "Ridley Scott", Bio: "British filmmaker" },
    Year: 2000,
    Actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    ImagePath: "/img/gladiator.jpg",
    Featured: false,
  },
  {
    Title: "The Silence of the Lambs",
    Description:
      "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer.",
    Genre: { Name: "Thriller", Description: "Psychological thriller / Crime" },
    Director: { Name: "Jonathan Demme", Bio: "American filmmaker" },
    Year: 1991,
    Actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    ImagePath: "/img/silence_of_lambs.jpg",
    Featured: false,
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
      console.log(`ID for "${movie.Title}": ${movie._id}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

populate();
