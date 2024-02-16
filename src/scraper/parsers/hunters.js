const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.wrapper.ng-star-inserted');

    divsName.each((index, element) => {
        const title = $(element).find('div.title').text().trim();
        const description = '';
        const link = $(element).find('a').attr('href');
        listDiv.push({ title, description, link });
    });

    return listDiv;
}

module.exports = parseHTMLContent
