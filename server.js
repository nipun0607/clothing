const express = require('express');
const path = require('path');
const Fuse = require('fuse.js'); // Import Fuse.js for fuzzy search
const app = express();
const PORT = process.env.PORT || 3000;

// Sample items array
const items = [
    { name: 'Red T-Shirt', price: '$19.99', image: '/images/red-tshirt.jpg' },
    { name: 'Blue Jeans', price: '$49.99', image: '/images/blue-jeans.jpg' },
    { name: 'Green Jacket', price: '$89.99', image: '/images/green-jacket.jpg' },
    { name: 'Yellow Dress', price: '$39.99', image: '/images/yellow-dress.jpg' },
    { name: 'Black Shoes', price: '$59.99', image: '/images/black-shoes.jpg' },
];

// Fuse.js options for fuzzy search
const options = {
    keys: ['name'],
    threshold: 0.2,  // Increase tolerance for matches (closer to 1 is more lenient)
    distance: 100,   // Increase distance tolerance
    minMatchCharLength: 4, // Minimum length of query to consider
};

const fuse = new Fuse(items, options);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET requests to the root URL by serving index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to handle search queries
app.get('/api/search', (req, res) => {
    const query = req.query.q;
    if (!query || query.trim().length === 0) {
        return res.json([]); // Return empty array if query is empty
    }

    const results = fuse.search(query);
    const filteredItems = results.map(result => result.item);

    res.json(filteredItems);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
