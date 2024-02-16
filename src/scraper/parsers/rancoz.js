const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('tr.trow').each((i, div) => {
        let title = $(div).find('td').first().text().trim();
        let description = $(div).find('td').eq(2).text().trim();
        let link = $(div).find('td').eq(5).children().first().attr('href');
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;