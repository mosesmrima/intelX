const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('article');
    divsName.each((i, div) => {
        let title = $(div).find('a').first().text().trim();
        let description = $(div).find('p').first().text().trim() || '';
        let link = $(div).find('a').first().attr('href');
        listDiv.push({"title": title, "description": description, 'link': link, 'slug': filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
