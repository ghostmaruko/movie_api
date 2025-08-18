-- === 1. RIMOZIONE TABELLE SE ESISTONO (ordine inverso alle dipendenze) ===
DROP TABLE IF EXISTS User_Movies;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Directors;
DROP TABLE IF EXISTS Genres;

-- === 2. CREAZIONE TABELLE ===

CREATE TABLE Genres (
  GenreID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Description varchar(1000)
);

CREATE TABLE Directors (
  DirectorID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Bio varchar(1000),
  Birthyear date,
  Deathyear date
);

CREATE TABLE Movies (
  MovieID serial PRIMARY KEY,
  Title varchar(100) NOT NULL,
  Description varchar(1000),
  GenreID integer NOT NULL,
  DirectorID integer NOT NULL,
  ImageURL varchar(300),
  Featured boolean,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID) REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID) REFERENCES Directors (DirectorID)
);

CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(100) NOT NULL,
  Birth_date date
);

CREATE TABLE User_Movies (
  UserMovieID serial PRIMARY KEY,
  UserID integer,
  MovieID integer,
  CONSTRAINT UserKey FOREIGN KEY (UserID) REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
);

-- === 3. INSERIMENTO DATI NELLE TABELLE “PADRE” ===

-- Generi
INSERT INTO Genres (Name, Description) VALUES 
('Action', 'Action movies'),
('Crime', 'Crime movies'),
('Drama', 'Drama movies'),
('Fantasy', 'Fantasy movies'),
('Sci-Fi', 'Sci-Fi movies'),
('Thriller', 'Thriller movies');

-- Registi
INSERT INTO Directors (Name, Bio, Birthyear, Deathyear) VALUES
('Jonathan Demme', 'Jonathan Demme is a well-known director.', '1944-01-01', '2017-01-01'),
('Ridley Scott', 'Ridley Scott is a well-known director.', '1937-01-01', NULL),
('Christopher Nolan', 'Christopher Nolan is a well-known director.', '1970-01-01', NULL),
('Peter Jackson', 'Peter Jackson is a well-known director.', '1961-01-01', NULL),
('Lana Wachowski', 'Lana Wachowski is a well-known director.', '1965-01-01', NULL),
('George Lucas', 'George Lucas is a well-known director.', '1944-01-01', NULL),
('Quentin Tarantino', 'Quentin Tarantino is a well-known director.', '1963-01-01', NULL),
('Francis Ford Coppola', 'Francis Ford Coppola is a well-known director.', '1939-01-01', NULL),
('Robert Zemeckis', 'Robert Zemeckis is a well-known director.', '1951-01-01', NULL);

-- Film
INSERT INTO Movies (Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES
('The Lord of the Rings', 'Epic fantasy adventure based on the novel by J.R.R. Tolkien.', 4, 4, 'lotr.jpg', TRUE),
('The Matrix', 'A hacker discovers the shocking truth about reality.', 5, 5, 'matrix.jpg', TRUE),
('Inception', 'A skilled thief enters dreams to steal secrets.', 5, 3, 'inception.jpg', FALSE),
('Star Wars: A New Hope', 'A young farmer joins a rebellion against an evil empire.', 5, 6, 'star_wars.jpg', TRUE),
('Pulp Fiction', 'A series of interconnected stories set in the criminal underworld of Los Angeles.', 2, 7, 'pupl_fiction.jpg', FALSE),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', 2, 8, 'The_Godfather.jpg', FALSE),
('Forrest Gump', 'The presidencies of Kennedy and Johnson... through the perspective of Forrest Gump.', 3, 9, 'forrest_gumps.jpg', FALSE),
('The Dark Knight', 'The Joker wreaks havoc and chaos on the people of Gotham.', 1, 3, 'the_dark_knight.jpg', FALSE),
('Interstellar', 'Explorers travel through a wormhole to ensure humanity''s survival.', 5, 3, 'interstellar.jpg', FALSE),
('Gladiator', 'A Roman General seeks vengeance against a corrupt emperor.', 1, 2, 'gladiator.jpg', FALSE),
('The Silence of the Lambs', 'A cadet seeks help from a killer to catch another serial killer.', 6, 1, 'silcence_of_lambs.jpg', FALSE);

-- Utenti
INSERT INTO Users (Username, Password, Email, Birth_date) VALUES
('mariorossi', 'pass1234', 'mario.rossi@email.com', '1990-05-10'),
('giuliabianchi', 'giulia88', 'giulia.bianchi@email.com', '1988-11-22'),
('andreapetro', 'andrea_pw', 'andrea.petro@email.com', '1995-03-15');

-- === 4. INSERIMENTO DATI NELLE TABELLE “FIGLIE” ===
INSERT INTO User_Movies (UserID, MovieID) VALUES
(1, 1),
(1, 2),
(2, 3);
