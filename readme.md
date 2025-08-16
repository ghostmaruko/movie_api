# Movie API Project

A simple REST API built with Node.js and Express that allows users to manage movie information, user accounts, and favorite movies. Includes a minimal frontend interface to display the movies in a responsive gallery with popup details.

---

## Project Structure

movie_api/
├── index.js # Express server
├── package.json # Project dependencies
├── public/
│ ├── index.html # Main movie gallery
│ ├── movies.html # Alternative movie view with popup
│ ├── documentation.html # API endpoint documentation
│ ├── style.css # CSS styles for the frontend
│ └── img/ # Movie posters
│ └── *.jpg
├── movie_api_postman_collection.json # Postman tests
├── test.js # (Optional dev script)
├── log.txt # (Optional logs)
└── screenshots/ # Screenshots of Postman tests

---

## Features

### API Endpoints

- `GET /movies` — Returns all movies  
- `GET /movies/:title` — Returns a movie by title  
- `GET /genres/:name` — Returns genre description  
- `GET /directors/:name` — Returns director info  
- `POST /users` — Registers a new user  
- `PUT /users/:username` — Updates username  
- `POST /users/:username/movies/:movieID` — Add to favorites  
- `DELETE /users/:username/movies/:movieID` — Remove from favorites  
- `DELETE /users/:username` — Delete user account  

>> See full documentation in `public/documentation.html` 

---

## Frontend (Mini UI)

- `http://localhost:8000/` → Responsive grid gallery with popups
- `http://localhost:8000/movies-list` → Alternative layout (griglia)
- Images and CSS are served via Express static middleware.

---

## Postman Testing

Postman test collection: `movie_api_postman_collection.json`  
Screenshots of responses: See `screenshots/` folder (if included).

---

## How to Run Locally

1. **Clone or extract the project**
2. Run the following in terminal:
   ```bash
   npm install
   node index.js
3. Open browser:
    http://localhost:8000/ to view movie gallery

API available via same port

## Built With

Node.js
Express.js
HTML + CSS (Vanilla frontend)
Postman (for testing)

## Notes

Movies and users are stored in-memory (no DB).

This is a backend project prepared for future MongoDB integration.

## Author

Marco Esu
