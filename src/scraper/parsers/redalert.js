const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.company-body').each((i, div) => {
        let title = $(div).find('h3').text().trim();
        let description = $(div).find('p').text().trim();
        listDiv.push({ 'title': title, 'description': description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
