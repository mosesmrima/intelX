const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('article');
    divsName.each((i, div) => {
        let title = $(div).find('h2.entry-title.heading-size-1 a').text().trim();
        let description = $(div).find('div.entry-content p').first().text().trim(); // Assuming first paragraph is desired
        let link = $(div).find('h2.entry-title.heading-size-1 a').attr('href');
        listDiv.push({title: title, description: description, link: link});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
