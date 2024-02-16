const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.card-body').each((i, div) => {
        const title = $(div).find('h5').text().trim();
        const description = $(div).find('p.card-text').eq(1).text().trim();
        const link = $(div).find('a.btn.btn-outline-primary').attr('href');
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
