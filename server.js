// vanilla node server/ REST api to list the books I am currently reading

const http = require('http');
const { getBooks, getBook, createBook, updateBook, deleteBook} = require('./controllers/bookController');

const server = http.createServer((req, res) => {
    if (req.url === '/api/books' && req.method === 'GET') {
        getBooks(req, res);
    } else if (req.url.match(/\/api\/books\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getBook(req, res, id);
    } else if (req.url === '/api/books' && req.method === 'POST') {
        createBook(req, res);

    } else if (req.url.match(/\/api\/books\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateBook(req, res, id);
    } else if (req.url.match(/\/api\/books\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteBook(req, res, id);
    } else  {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'route not found'}));
    }
})
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Well, well, well, if it isn't the port I'm running this server on: ${PORT}`))