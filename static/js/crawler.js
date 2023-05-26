const puppeteer = require('puppeteer');
const fs = require('fs');
const {json} = require("express");
async function searchEventsByMonthYear(month, year) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const url = `https://fr.wikipedia.org/wiki/${month}_${year}`;

        await page.goto(url);

        const isPageAvailable = await page.evaluate(() => {
            const headingElement = document.querySelector('#firstHeading');
            return !!headingElement;
        });

        if (!isPageAvailable) {
            console.log(`La page pour ${month} ${year} n'est pas disponible.`);
            return;
        }

        const events = await page.$$eval('.mw-parser-output > ul > li', (elements) => {
            return elements
                .filter((element) => {
                    const title = element.textContent.trim();
                    return /^\d+\s/.test(title);
                })
                .map((element) => {
                    const linkElement = element.querySelector('a');
                    const day = element.textContent.match(/^\d+/)[0];
                    const title = linkElement.textContent;
                    const link = linkElement.href;
                    return { day, title, link };
                });
        });
        const data = JSON.stringify(events, null, 2);
        fs.writeFileSync('../../events.json', data);
        console.log(`Les informations pour ${month} ${year} ont été enregistrées dans events.json.`);
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    } finally {
        await browser.close();
    }
}



async function searchArticleByDayMonthYear(link, year) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(link);

        const isPageAvailable = await page.evaluate(() => {
            const headingElement = document.querySelector('#firstHeading');
            return !!headingElement;
        });

        if (!isPageAvailable) {
            console.log(`La page pour le lien spécifié n'est pas disponible.`);
            return;
        }

        const article = await page.$$eval('.mw-parser-output > ul > li', (elements, year) => {
            const articleElement = elements.find((element) => {
                const content = element.textContent.trim();
                return content.includes(year);
            });

            if (articleElement) {
                const title = articleElement.textContent;
                return { title };
            }

            return null;
        }, year);
        if (article) {
            console.log(`Phrase trouvée : ${article.title}`);
        } else {
            console.log(`Aucune phrase trouvée pour l'année ${year}.`);
        }
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    } finally {
        await browser.close();
    }
}

// Utilisation : spécifier le lien vers la page du jour, le mois et l'année
searchArticleByDayMonthYear('https://fr.wikipedia.org/wiki/30_novembre', '1786');



// Utilisation : spécifier le mois et l'année souhaités (mois : 'Janvier' , 'Février' , 'Mars' , 'Avril' , 'Mai' , 'Juin' , 'Juillet' , 'Août' , 'Septembre' , 'Octobre' , 'Novembre' , 'Décembre')
searchEventsByMonthYear('Décembre', '2019');

