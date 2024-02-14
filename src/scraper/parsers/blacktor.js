const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('tbody').first().find('tr');
    divsName.each((i, div) => {
        const textContent = $(div).children().eq(3).text().trim();
        listDiv.push(textContent);
    });
    listDiv = [...new Set(listDiv)];
    return listDiv;
}

module.exports = parseHTMLContent;
