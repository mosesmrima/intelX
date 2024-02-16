const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.blog-post-content').each((i, div) => {
        let title = $(div).find('h2.blog-post-title').text().trim();
        let description = $(div).find('p').first().text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
