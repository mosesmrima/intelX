const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];

    const $ = cheerio.load(htmlContent);

    $('div.card').each((index, div) => {
        $(div).find('a').each((i, item) => {
            const title = $(item).text().trim();
            const description = "";
            const link = $(item).attr('href');
            listDiv.push({ "title": title, "description": description, "link": link });
        });
    });

    return listDiv;
}

module.exports = parseHTMLContent;

