const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.post').each((i, div) => {
        const title = $(div).find('a').attr('href').split('/')[2];
        const description = $(div).find('p').text().trim();
        const link = $(div).find('a').attr('href');
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
