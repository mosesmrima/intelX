const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.border.border-warning.card-body.shadow-lg');
    divsName.each((i, div) => {
        let title = $(div).find('h4').text().trim();
        let description = $(div).find('p').text().trim();
        listDiv.push({'title': title, 'description': description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
