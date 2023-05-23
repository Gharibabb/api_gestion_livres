const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Définir les CORS pour autoriser les requêtes provenant d'autres domaines
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Importer les données des livres
const books = require('./books.json');

// Afficher tous les livres
app.get('/books', (req, res) => {
  res.json(books);
});

// Afficher un livre par rapport à son id
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
});

// Ajouter un nouveau livre
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Modifier un livre par rapport à son id
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
});

// Supprimer un livre par rapport à son id
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).json({ message: 'Livre non trouvé' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
