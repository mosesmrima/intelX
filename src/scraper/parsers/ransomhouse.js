const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.cls_record').each((index, element) => {
        const title = $(element).find('div.cls_recordTop').text().trim();
        const description = '';
        const link = $(element).find('a').attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
