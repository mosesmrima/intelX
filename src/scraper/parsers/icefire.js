const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('tr.fw-normal');

    divsName.each((index, element) => {
        $(element).find('td').contents().each((idx, item) => {
            const text = $(item).text().trim();
            if (text !== '') {
                listDiv.push(text);
            }
        });
    });

    listDiv = [...new Set(listDiv)];
    const index = listDiv.indexOf('updating');
    if (index !== -1) {
        listDiv.splice(index, 1);
    }

    return listDiv;
}

module.exports = parseHTMLContent