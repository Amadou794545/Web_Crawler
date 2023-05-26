const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/Html', (req, res) => {
    const request = require('request');
    const cheerio = require('cheerio');

    const url = 'https://www.wiflix.surf/';

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const links = $('a');
            const linkList = [];

            links.each((i, link) => {
                const href = $(link).attr('href');
                if (href) {
                    linkList.push(href);
                }
            });

            res.json(linkList); // Envoie la liste des liens en tant que réponse JSON
        } else {
            res.status(500).send('Une erreur est survenue lors de la récupération des liens.');
        }
    });
});
