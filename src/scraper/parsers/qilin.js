const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.item_box').each((i, div) => {
        let title = $(div).find('a.item_box-title.mb-2.mt-1').text().trim();
        let description = $(div).find('div.item_box_text').text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
