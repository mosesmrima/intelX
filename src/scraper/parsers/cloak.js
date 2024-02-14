const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.main__items');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = "";
        let linkElement = $(div).find('a');
        let link = linkElement.attr('href') ? linkElement.attr('href') : '';
        listDiv.push({title: title, description: description, link: link});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
