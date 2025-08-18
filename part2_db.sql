-- === PARTE 2: QUERY ===

-- 1️⃣ Selezionare un genere per nome e tutti i film dello stesso genere
-- Supponiamo di cercare il genere "Sci-Fi"

-- Seleziona il genere
SELECT * FROM Genres
WHERE Name = 'Sci-Fi';

-- Seleziona tutti i film di quel genere
SELECT * FROM Movies
WHERE GenreID = (SELECT GenreID FROM Genres WHERE Name = 'Sci-Fi');


-- 2️⃣ Aggiornare l'email di un utente per nome
-- Aggiorniamo l'email di 'giuliabianchi'

UPDATE Users
SET Email = 'giulia.new@email.com'
WHERE Username = 'giuliabianchi';

-- Controllo per verificare l'update
SELECT * FROM Users
WHERE Username = 'giuliabianchi';


-- 3️⃣ Eliminare un film mantenendo almeno 2 film dello stesso regista e dello stesso genere
-- Supponiamo di eliminare "The Godfather"

-- Controllo: film dello stesso regista prima del delete
SELECT * FROM Movies
WHERE DirectorID = (SELECT DirectorID FROM Directors WHERE Name = 'Francis Ford Coppola');

-- Controllo: film dello stesso genere prima del delete
SELECT * FROM Movies
WHERE GenreID = (SELECT GenreID FROM Genres WHERE Name = 'Crime');

-- Eseguiamo il delete
DELETE FROM Movies
WHERE Title = 'The Godfather';

-- Controllo finale: tutti i film rimanenti
SELECT * FROM Movies;

-- Controllo finale: film dello stesso regista dopo il delete
SELECT * FROM Movies
WHERE DirectorID = (SELECT DirectorID FROM Directors WHERE Name = 'Francis Ford Coppola');

-- Controllo finale: film dello stesso genere dopo il delete
SELECT * FROM Movies
WHERE GenreID = (SELECT GenreID FROM Genres WHERE Name = 'Crime');
