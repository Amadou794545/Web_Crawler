const puppeteer = require('puppeteer');

const newsSites = [
    {
        name: 'BBC News',
        url: 'https://www.bbc.co.uk/news',
        titleSelector: 'h3.gs-c-promo-heading__title',
        linkSelector: 'a.gs-c-promo-heading',
    },
    // Ajoutez d'autres sites d'actualités ici
];

const crawlNewsSites = async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        for (const site of newsSites) {
            console.log(`Crawling ${site.name}...`);
            await page.goto(site.url, { timeout: 30000 });
            await page.waitForSelector(site.titleSelector);

            const articles = await page.evaluate((titleSelector, linkSelector) => {
                const articleTitles = Array.from(document.querySelectorAll(titleSelector));
                const articleLinks = Array.from(document.querySelectorAll(linkSelector));

                return articleTitles.map((titleElement, index) => ({
                    title: titleElement.textContent.trim(),
                    link: articleLinks[index].href,
                }));
            }, site.titleSelector, site.linkSelector);

            console.log(`Articles from ${site.name}:`);
            articles.forEach((article) => {
                console.log(`Title: ${article.title}`);
                console.log(`Link: ${article.link}`);
                console.log('---');
            });

            console.log(`${site.name} crawling finished.`);
            console.log('---');
        }

        await browser.close();
    } catch (error) {
        console.error('Une erreur s\'est produite lors du crawl :', error);
    }
};

crawlNewsSites();
