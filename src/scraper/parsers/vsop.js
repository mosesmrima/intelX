const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.group.center.testimonials').each((i, div) => {
        $(div).find('article').each((j, article) => {
            const title = $(article).find('h6').text().trim();
            const description = $(article).find('blockquote').text().trim();
            listDiv.push({ 'title': title, 'description': description });
        });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
