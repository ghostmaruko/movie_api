## Movie API Project

A complete REST API built with Node.js, Express, and MongoDB that allows users to manage movie information, user accounts, and favorite movies. Includes a minimal frontend interface to display the movies in a responsive gallery with popup details.

---

## Live Links

- **Live App (frontend + backend)**: https://movie-api-2025-9f90ce074c45.herokuapp.com/
- **API Docs**: https://movie-api-2025-9f90ce074c45.herokuapp.com/documentation.html
- **Postman Collection**: Included in project files (`postman_req` folder)
- **GitHub Repo**: https://github.com/ghostmaruko/movie_api

### Backend Endpoints (JWT required for most requests)

- `POST /users` — Register a new user (no token required)  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/users`

- `POST /login` — Login to get JWT token  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/login`

- `GET /movies` — List all movies (requires JWT)  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/movies`

- `GET /movies/:title` — Get movie by title (requires JWT)  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/movies/Inception`

- `GET /genres/:name` — Get genre info (requires JWT)  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/genres/Action`

- `GET /directors/:name` — Get director info (requires JWT)  
  `https://movie-api-2025-9f90ce074c45.herokuapp.com/directors/Christopher%20Nolan`

- `POST /users/:username/movies/:movieID` — Add movie to favorites (requires JWT)

- `DELETE /users/:username/movies/:movieID` — Remove movie from favorites (requires JWT)

- `PUT /users/:username` — Update user info (requires JWT)

- `DELETE /users/:username` — Delete user (requires JWT)

**Authentication:** All routes (except `POST /users` and `POST /login`) require JWT authentication.  
**Authorization:** Passport.js with Local and JWT strategies.  
**Passwords** are hashed using bcrypt.  
All endpoints tested in Postman.

---

## Frontend (Static UI)

Served via Express using static middleware.

- `/` → Responsive movie gallery with grid and popup modals
- `/movies-list` → Alternative static layout

⚠️ Note: All API endpoints (e.g., `/users`, `/movies/:title`) require JWT authentication. Accessing them directly via browser will result in "Unauthorized". Use Postman or another API client with a valid JWT token to test the backend.

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

## Notes on Testing the Backend

⚠️ Important: All protected API endpoints require a JWT token. You cannot directly test them via a browser. Use Postman (or another HTTP client) with the token to access routes like /users, /movies/:title, etc.

## Example endpoints

## Endpoint Method Notes

    /users	                                    POST	                Register a new user
    /login	                                    POST	                Login to get JWT
    /movies	                                    GET	                    Returns all movies (requires JWT)
    /movies/:title	                            GET	                    Returns a movie by title (requires JWT)
    /users/:username/movies/:movieID	        POST / DELETE	        Add/remove favorites (requires JWT)

## Testing steps:

Register a user via POST /users.

Login via POST /login to receive a JWT token.

In Postman, set Authorization → Bearer Token with the received JWT.

Test protected endpoints like /users, /movies, /users/:username/movies/:movieID.

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

## Screenshots & Postman

All API requests tested in Postman.

Screenshots of successful requests are included in the screenshots/ folder.

Full Postman collection is included in postman_req/ for direct import.

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
