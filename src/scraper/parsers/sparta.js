const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.card.mb-2').each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = $(div).find('p').text().trim();
        listDiv.push({ 'title': title, 'description': description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
