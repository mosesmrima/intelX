const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('a[target="_blank"]');
    divsName.each((i, div) => {
        $(div).find('font[color="#5B61F6"]').each((j, item) => {
            listDiv.push($(item).text().trim());
        });
    });
    listDiv = [...new Set(listDiv)];
    return listDiv;
}

module.exports = parseHTMLContent;
