const request = require('request');
const cheerio = require('cheerio');

const url = 'https://fr.wikipedia.org/wiki/IPhone';

request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const links = $('a');
        links.each((i, link) => {
            const href = $(link).attr('href');
            console.log(href);
        });
    }
});