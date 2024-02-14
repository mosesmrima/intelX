const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.block-content');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text();
        let description = $(div).find('strong').text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({"title": title, "description": description, 'link': link, 'slug': filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
