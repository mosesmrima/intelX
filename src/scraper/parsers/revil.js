const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.card-header.d-flex.justify-content-between').each((i, div) => {
        listDiv.push($(div).find('span').text().trim());
    });

    listDiv = [...new Set(listDiv)]; // Remove duplicates
    return listDiv;
}

module.exports = parseHTMLContent;
