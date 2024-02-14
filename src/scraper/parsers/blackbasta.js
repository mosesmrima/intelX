const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let parsedItems = [];
    let $ = cheerio.load(htmlContent);
    let divsName = $('div.card');
    divsName.each((i, div) => {
        let title = $(div).find('a.blog_name_link').text().trim();
        let description = '';
        $(div).find('p').each((j, desc) => {
            description += $(desc).text().trim() + ' '
        });
        parsedItems.push({'title': title, 'description': description.trim()});
    });
    return parsedItems;
}

module.exports = parseHTMLContent;
