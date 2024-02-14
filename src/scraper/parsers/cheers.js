const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('h2.excerpt-title');
    divsName.each((i, div) => {
        $(div).contents().each((j, item) => {
            let text = $(item).text().trim();
            if (text !== '') {
                listDiv.push(text);
            }
        });
    });
    listDiv = [...new Set(listDiv)];
    return listDiv;
}

module.exports = parseHTMLContent;
