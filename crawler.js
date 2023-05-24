const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

const newsSites = [
    {
        name: 'BBC News',
        url: 'https://www.bbc.co.uk/news',
    },
    {
        name: 'CNN',
        url: 'https://www.cnn.com/',
    },
    // Ajoutez d'autres sites d'actualités ici
];

async function crawlNewsSites() {
    try {
        for (const site of newsSites) {
            console.log(`Crawling ${site.name}`);

            const response = await fetch(site.url);
            const html = await response.text();
            const $ = cheerio.load(html);

            // Sélecteur CSS pour les titres des articles
            const titleSelector = 'a.gs-c-promo-heading';

            $(titleSelector).each((index, element) => {
                const title = $(element).text().trim();
                const link = $(element).attr('href');

                console.log(`Title: ${title}`);
                console.log(`Link: ${link}`);
                console.log('---');
            });

            console.log(`Crawling ${site.name} completed\n`);
        }
    } catch (error) {
        console.error('An error occurred during crawling:', error);
    }
}

crawlNewsSites();
