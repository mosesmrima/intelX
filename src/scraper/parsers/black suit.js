const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let parsedItems = [];
    let $ = cheerio.load(htmlContent);
    let divsName = $('div.card');
    divsName.each((i, div) => {
        let title = $(div).find('div.title').first().text().trim();
        let description = $(div).find('div.text').first().text().trim();
        let link = $(div).find('a').first().attr('href');
        parsedItems.push({'title': title, 'description': description, 'link': link});
    });
    return parsedItems;
}

module.exports = parseHTMLContent;
