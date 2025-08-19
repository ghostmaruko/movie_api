// === READ QUERIES ===

// 1. Find movie by title
db.movies.find({ title: "Inception" });

// 2. Find all movies with a specific genre (e.g., Sci-Fi)
db.movies.find({ "genre.name": "Sci-Fi" });

// 3. Find all movies with a specific genre AND director
db.movies.find({
  "genre.name": "Sci-Fi",
  "director.name": "Christopher Nolan"
});

// === UPDATE QUERIES ===

// 1. Update the description of "The Matrix"
db.movies.updateOne(
  { title: "The Matrix" },
  { $set: { description: "Neo discovers the truth about the Matrix." } }
);

// 2. Update the bio of Christopher Nolan in all his movies
db.movies.updateMany(
  { "director.name": "Christopher Nolan" },
  { $set: { "director.bio": "Christopher Nolan is an acclaimed British-American film director." } }
);

// 3. Add "The Dark Knight" to the favorites of user "giuliabianchi"
const darkKnight = db.movies.findOne({ title: "The Dark Knight" });
db.users.updateOne(
  { username: "giuliabianchi" },
  { $addToSet: { favorites: darkKnight._id } }
);

// === DELETE QUERY ===

// Delete a user by username (e.g., simoneneri)
db.users.deleteOne({ username: "simoneneri" });

// === FINAL READ ===

// Read all users after updates/deletion
db.users.find().pretty();
