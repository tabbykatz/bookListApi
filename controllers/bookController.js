// control routes

const Book = require('../models/bookModel');
const { getPostData } = require('../utils');

// @desc gets all books 
// @route GET /api/books

async function getBooks(req, res) {
    try{
        const books = await Book.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(books))
    } catch (error) {
        console.log(error)
    }
}

// @desc get single book by id
// @route GET /api/books/id

async function getBook(req, res, id) {
    try{
        const book = await Book.findById(id);

        if (!book) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'book not found'}));
        } else {  
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(book))
        }   
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Book
// @route   POST /api/books
async function createBook(req, res) {
    try {
        const body = await getPostData(req)

        const { title, description, author } = JSON.parse(body)

        const book = {
            title,
            description,
            author
        }

        const newBook = await Book.create(book)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newBook))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    update a Book
// @route   PUT /api/books/id
async function updateBook(req, res, id) {
    try {

        const book = await Book.findById(id);
        if (!book) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'book not found'}))
        } else {
            const body = await getPostData(req)
            const { id, title, description, author } = JSON.parse(body)

            const bookData = {
                id: book.id,
                title: title || book.title || "",
                description: description || book.description || "",
                author: author || book.author || ""
            }

        const updBook = await Book.update(id, bookData);

        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(updBook))  

        }


    } catch (error) {
        console.log(error)
    }
}

// @desc delete single book by id
// @route DELETE /api/books/id

async function deleteBook(req, res, id) {
    try{
        const book = await Book.findById(id);

        if (!book) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'book not found'}));
        } else {  
            await Book.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Book ${id} removed`}))
        }   
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}