const express = require('express');
const path = require('path');
const {query} = require("express");
const {searchEvents, searchArticle} = require("./static/js/crawler");
const {readEventsFromFile} = require("./static/js/parseJson");

const app = express();

// Définir le dossier statique pour servir les fichiers CSS, JavaScript, etc.
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    if (req.query.month && req.query.year) {
        const year = req.query.year;
        const month = req.query.month;
        searchEvents(month, year);

        const parsedData = readEventsFromFile(); // Récupérer les données analysées à partir du fichier
        let hasMatchingArticles = false;

        parsedData.forEach((event) => {
            const article = searchArticle(event.link, year);
            if (article) {
                console.log(article);
                hasMatchingArticles = true;
            }
        });

        if (!hasMatchingArticles) {
            console.log("Aucune phrase correspondante trouvée pour l'année spécifiée.");
            res.send("Il n'y a aucun événement dans le mois et l'année spécifiés.");
            return;
        }
    } else {
        res.sendFile(path.join(__dirname, 'template', 'index.html'));
    }
});





const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

