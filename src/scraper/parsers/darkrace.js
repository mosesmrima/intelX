const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('article.post-block');
    divsName.each((i, div) => {
        let title = $(div).find('h2 a').text().trim();
        let description = $(div).find('div.post-content').text().trim();
        listDiv.push({title: title, description: description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
