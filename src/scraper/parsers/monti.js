const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('a.leak-card.p-3').each((i, div) => {
        let title = $(div).find('h5').text().trim();
        let description = $(div).find('p').text().trim();
        let link = $(div).attr('href');
        listDiv.push({'title': title, 'description': description, "link": link});
    });

    return listDiv;
}

module.exports = parseHTMLContent;
