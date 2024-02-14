const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    let $ = cheerio.load(htmlContent);
    let divsName = $('table.table.table-bordered.table-content');
    divsName.each((i, div) => {
        let title = $(div).find('h1').text().trim();
        let description = $(div).find('p').text().trim();
        listDiv.push({title: title, description: description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
