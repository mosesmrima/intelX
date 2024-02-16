const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.box.post-box');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = $(div).find('p').text().trim();
        let link = $(div).find('h2 a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link, 'slug': filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
