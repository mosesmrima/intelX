const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.list-group-item.rounded-3.py-3.bg-body-secondary.text-bg-dark.mb-2.position-relative');
    divsName.each((i, div) => {
        let title = $(div).find('a').text().trim();
        let description = $(div).find('div.small.opacity-50').text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({"title": title, "description": description, 'link': link, 'slug': filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
