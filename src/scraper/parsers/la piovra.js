const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('article');

    divsName.each((index, element) => {
        const title = $(element).find('h2.entry-title a').text().trim();
        const description = $(element).find('div.entry-content').text().trim();
        listDiv.push({ title, description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
