const express = require('express');
const path = require('path');

const app = express();

// Définir le dossier statique pour servir les fichiers CSS, JavaScript, etc.
app.use(express.static(path.join(__dirname, '../..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../template', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
