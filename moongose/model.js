const mongoose = require("mongoose");

// Schema per i film
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String },
  Year: Number,
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

// Schema per gli utenti
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// hashing della password
const bcrypt = require("bcrypt");
// funzione statica per hashare la password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// metodo istanza per validare la password in fase di login
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};


let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
