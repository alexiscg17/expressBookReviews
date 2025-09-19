const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ username, password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn], null, 4));
});

public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const allBooks = Object.values(books);
    const booksByAuthor = allBooks.filter(book => book.author === author);
    res.send(booksByAuthor);
});

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const allBooks = Object.values(books);
    const booksByTitle = allBooks.filter(book => book.title === title);
    res.send(booksByTitle);
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;