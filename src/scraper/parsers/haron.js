const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('h3');
    divsName.each((i, div) => {
        $(div).contents().each((j, item) => {
            const textContent = $(item).text().trim();
            if (textContent) {
                listDiv.push(textContent);
            }
        });
    });
    listDiv = [...new Set(listDiv)]; // Remove duplicates
    return listDiv;
}

module.exports = parseHTMLContent;
