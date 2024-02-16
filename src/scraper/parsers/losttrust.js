const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.col.d-flex.align-items-stretch.mb-3');

    divsName.each((index, element) => {
        const title = $(element).find('div.card-header').text().trim();
        const description = $(element).find('p.card-text').text().trim();
        const link = $(element).find('a.btn.btn-primary.btn-sm').attr('href');
        listDiv.push({ title, description, link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
