const mongoose = require("mongoose");

// Schema per i film
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
  },
  year: Number,
  actors: [String],
  imageURL: String,
  featured: Boolean,
});

// Schema per gli utenti
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: String }],
});

// hashing della password
const bcrypt = require("bcrypt");

// funzione statica per hashare la password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// metodo istanza per validare la password in fase di login
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
