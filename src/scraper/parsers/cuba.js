const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.list-text');
    divsName.each((i, div) => {
        let link = $(div).find('a').attr('href');
        let title = link.split('/')[2];
        let description = $(div).find('a').text().trim();
        listDiv.push({title: title, description: description, link: link, slug: filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
