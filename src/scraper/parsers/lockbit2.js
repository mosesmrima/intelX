const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.post-block.bad');

    divsName.each((index, div) => {
        const title = $(div).find('div.post-title').text().trim();
        const description = $(div).find('div.post-block-text').text().trim();
        listDiv.push({ title, description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
