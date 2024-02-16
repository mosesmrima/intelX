const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('section#openSource');
    divsName.each((i, div) => {
        $(div).find('a.a_href').each((j, item) => {
            let textContent = $(item).text().replace(' - ', '#').split('#')[0].replace('+', '').trim();
            listDiv.push(textContent);
        });
    });
    listDiv = [...new Set(listDiv)]; // Remove duplicates
    return listDiv;
}

module.exports = parseHTMLContent;
