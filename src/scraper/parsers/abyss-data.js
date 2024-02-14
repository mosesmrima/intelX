const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let list_div = [];
    let $ = cheerio.load(htmlContent);
    let divs_name = $('.card-body');
    divs_name.each((i, div) => {
        let title = $(div).find('.card-title').text().trim();
        let description = $(div).find('.card-text').text().trim();
        list_div.push({ 'title': title, 'description': description });
    });
    console.log(list_div);
    return list_div;
}

module.exports = parseHTML;
