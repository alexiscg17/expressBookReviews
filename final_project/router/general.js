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
    res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];

    if(book){
        res.status(200).send(JSON.stringify(book, null, 4));
    }
    else{
        res.status(404).json({ message: "Unable to find book." });
    }
});

public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const allBooks = Object.values(books);
    const booksByAuthor = allBooks.filter(book => book.author === author);
    
    if(booksByAuthor.length > 0){
        res.status(200).send(booksByAuthor);
    }
    else{
        res.status(404).json({ message: "Unable to find book by author." });
    }
});

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const allBooks = Object.values(books);
    const booksByTitle = allBooks.filter(book => book.title === title);
    
    if(booksByTitle.length > 0){
        res.status(200).send(booksByTitle);
    }
    else{
        res.status(404).json({ message: "Unable to find book by title." });
    }
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    let reviews = books[isbn].reviews;

    if(book){
        if(reviews){
            res.status(200).send(JSON.stringify(reviews, null, 4));
        }
        else{
            res.status(404).json({ message: "Reviews not found." });
        }
    }
    else{
        
    }
});

module.exports.general = public_users;