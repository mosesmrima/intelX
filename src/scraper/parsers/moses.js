const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('a.elementskit-entry-thumb').each((i, element) => {
        const imgAlt = $(element).find('img').attr('alt').trim();
        listDiv.push(imgAlt);
    });

    listDiv = [...new Set(listDiv)]; // Remove duplicates
    return listDiv;
}

module.exports = parseHTMLContent;
