const { JSDOM } = require("jsdom");

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');

    const urls = Array.from(links)
        .map(link => link.href ? (link.href.startsWith('/') ? `${baseURL}${link.href}` : link.href) : null)
        .filter(url => url !== null)
        .filter(url => {
            try {
                const test = new URL(url);
                return true;
            } catch (e) {
                console.log(`${e.message}:  ${url}`);
                return false;
            }
        });

    return urls;
};

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML
};
