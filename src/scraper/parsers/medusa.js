const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.card');

    divsName.each((index, element) => {
        const title = $(element).find('h3.card-title').text().trim();
        const description = $(element).find('div.card-body').text().trim();
        const link = 'detail?id=' + $(element).attr('data-id');
        listDiv.push({ title, description, link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
