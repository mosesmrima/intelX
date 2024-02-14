const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, filename) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.col-6.d-flex.justify-content-end.position-relative.blog-div');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = $(div).find('div.head-info-body.blog-head-info-body').find('a').text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link, 'slug': filename});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
