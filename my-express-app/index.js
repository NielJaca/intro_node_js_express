const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());


const items = ['Apple', 'Banana', 'Orange'];


app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);  
        res.json(items);  
    } else {
        res.status(400).send('No item provided');
    }
});


app.get('/items', (req, res) => {
    res.json(items);  
});


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});