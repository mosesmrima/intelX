const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.title.is-4').each((i, div) => {
        const title = $(div).find('a').text().trim();
        if (title) {
            listDiv.push(title);
        }
    });

    return [...new Set(listDiv)];
}

module.exports = parseHTMLContent;