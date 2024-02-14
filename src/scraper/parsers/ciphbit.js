const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.post');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = '';
        $(div).find('p').each((j, p) => {
            description += $(p).text();
        });
        listDiv.push({title: title, description: description.trim()});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
