const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.blog-card.p-3.col-md-9').each((i, div) => {
        let title = $(div).find('div.post-header.col-md-12.no-pad.px-3').children().first().text().trim();
        let description = $(div).find('div.post-short-description.col-md-12.no-pad.px-3.mt-5').children().first().text().trim();
        listDiv.push({ 'title': title, 'description': description });
    });

    $('div.container.product.mt-4').each((i, div) => {
        let title = $(div).find('div.product-header').children().first().text().trim();
        let description = $(div).find('div.product-list-description.col-md-7.mt-3.no-pad').children().first().text().trim();
        listDiv.push({ 'title': title, 'description': description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
