
# Movie API Project

A complete REST API built with Node.js, Express, and MongoDB that allows users to manage movie information, user accounts, and favorite movies. Includes a minimal frontend interface to display the movies in a responsive gallery with popup details.

---

## Live Links

- 🟢 **Live App**: https://movie-api-2025-9f90ce074c45.herokuapp.com/
- 🧠 **API Docs**: https://movie-api-2025-9f90ce074c45.herokuapp.com/documentation.html
- 🧪 **Postman Collection**: Included in project files
- 🗂️ **GitHub Repo**: https://github.com/<ghostmaruko>/movie_api

---

## Features

### Backend API Endpoints

- `GET /movies` — Returns all movies
- `GET /movies/:title` — Returns a movie by title
- `GET /genres/:name` — Returns genre description
- `GET /directors/:name` — Returns director info
- `POST /users` — Registers a new user
- `PUT /users/:username` — Updates user info
- `POST /users/:username/movies/:movieID` — Add to favorites
- `DELETE /users/:username/movies/:movieID` — Remove from favorites
- `DELETE /users/:username` — Delete user account

🔐 Authentication: All routes (except POST /users and /login) require JWT authentication.  
🛡️ Authorization: Passport.js with HTTP Basic and JWT strategies.  
🔐 Passwords are hashed using bcrypt.  
🧪 All endpoints tested in Postman.

---

## Frontend (Static UI)

Served via Express using static middleware.

- `/` → Responsive movie gallery with grid and popup modals
- `/movies-list` → Alternative static layout

---

## Project Structure

movie_api/
├── index.js
├── package.json
├── moongose/
│   └── model.js
├── public/
│   ├── index.html
│   ├── movies.html
│   ├── documentation.html
│   ├── style.css
│   └── img/ (movie posters)
├── movie_api_postman_collection.json
├── log.txt
└── screenshots/ (Postman test results)

---

## Deployment

✅ MongoDB Atlas connected via Mongoose  
✅ Environment variables used (`CONNECTION_URI`, `PORT`)  
✅ App deployed to Heroku

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- express-validator (Data validation)
- CORS
- Morgan
- Postman

---

## Development Notes

- CORS implemented to allow all origins
- Password hashing applied on registration and login
- Data validation added using `express-validator`
- MongoDB Atlas used instead of in-memory DB
- Heroku deployment tested and verified
- All API features from Achievement 2 and 3 implemented
- Favicon.ico and broken image issues resolved via path normalization

---

## Author

Marco Esu – 2025  
This project was completed as part of the Full-Stack Web Development Career Path.
