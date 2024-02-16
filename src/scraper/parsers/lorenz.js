const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.panel-heading');

    divsName.each((index, div) => {
        $(div).find('h3').each((idx, item) => {
            listDiv.push($(item).text().trim());
        });
    });

    listDiv = [...new Set(listDiv)]; // Remove duplicates
    return listDiv;
}

module.exports = parseHTMLContent;
