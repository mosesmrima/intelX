const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    let blacklist = ['HOME', 'HOW TO DOWNLOAD?', 'ARCHIVE'];
    const $ = cheerio.load(htmlContent);
    const divsName = $('span.g-menu-item-title');
    divsName.each((i, div) => {
        $(div).contents().each((j, item) => {
            let text = $(item).text().trim();
            if (!blacklist.includes(text) && text !== '') {
                listDiv.push(text);
            }
        });
    });
    listDiv = [...new Set(listDiv)];
    return listDiv;
}

module.exports = parseHTMLContent;
