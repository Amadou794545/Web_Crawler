const express = require('express');
const path = require('path');
const { searchEvents, searchArticle } = require("./static/js/crawler");
const { readEventsFromFile } = require("./static/js/parseJson");

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', async (req, res) => {
    if (req.query.month && req.query.year) {
        const year = req.query.year;
        const month = req.query.month;
        await searchEvents(month, year);

        const parsedData = readEventsFromFile();
        let hasMatchingArticles = false;
        let eventsText = '';

        for (const event of parsedData) {
            const article = await searchArticle(event.link, year);
            if (article) {
                eventsText += `Le ${event.day} ${month} ${year}, ${article}`;
                hasMatchingArticles = true;
            }
        }

        if (!hasMatchingArticles) {
            console.log("Aucune phrase correspondante trouvée pour l'année spécifiée.");
            res.json({ message: "Il n'y a aucun événement dans le mois et l'année spécifiés." });
            return;
        }

        const response = { eventsText };
        res.json(response);
    } else {
        res.sendFile(path.join(__dirname, 'template', 'index.html'));
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
