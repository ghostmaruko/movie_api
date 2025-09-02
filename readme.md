# Movie API Project

A complete REST API built with Node.js, Express, and MongoDB that allows users to manage movie information, user accounts, and favorite movies. Includes a minimal frontend interface to display the movies in a responsive gallery with popup details.

---

## Live Links

- 🟢 **Live App**: [https://movie-api-2025-9f90ce074c45.herokuapp.com/](https://movie-api-2025-9f90ce074c45.herokuapp.com/)
- 🧠 **API Docs**: [https://movie-api-2025-9f90ce074c45.herokuapp.com/documentation.html](https://movie-api-2025-9f90ce074c45.herokuapp.com/documentation.html)
- 🧪 **Postman Collection**: Included in project files
- 🗂️ **GitHub Repo**: [https://github.com/ghostmaruko/movie_api](https://github.com/ghostmaruko/movie_api)

---

## Features

### Backend API Endpoints

- `GET /movies` — Returns all movies
- `GET /movies/:title` — Returns a movie by title
- `GET /genres/:name` — Returns genre description
- `GET /directors/:name` — Returns director info
- `POST /users` — Registers a new user
- `POST /login` — User login, returns JWT
- `PUT /users/:username` — Updates user info
- `POST /users/:username/movies/:movieID` — Add a movie to favorites
- `DELETE /users/:username/movies/:movieID` — Remove a movie from favorites
- `DELETE /users/:username` — Delete user account

**Authentication:** All routes (except `POST /users` and `POST /login`) require JWT authentication.  
**Authorization:** Passport.js with Local and JWT strategies.  
**Passwords** are hashed using bcrypt.  
All endpoints tested in Postman.

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
│ └── model.js
├── public/
│ ├── index.html
│ ├── movies.html
│ ├── documentation.html
│ ├── style.css
│ └── img/ (movie posters)
├── movie_api_postman_collection.json
├── log.txt
└── screenshots/ (Postman test results)

---

---

## Deployment

✅ MongoDB Atlas connected via Mongoose  
✅ Environment variables used (`CONNECTION_URI`, `PORT`)  
✅ App deployed to Heroku  
✅ CORS enabled for all origins  
✅ All endpoints fully tested and verified

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

- Password hashing applied on registration and login
- Data validation added using `express-validator`
- All API features from Achievement 2 and 3 implemented
- Images served statically with path normalization
- Postman collection and screenshots included for API testing
- Documentation updated with full endpoint details and example requests/responses

---

## Author

Marco Esu – 2025
