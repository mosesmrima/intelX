const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.content').each((i, div) => {
        let title = $(div).find('div.name').text().trim();
        let description = $(div).find('div.description').text().trim();
        listDiv.push({ 'title': title, 'description': description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
