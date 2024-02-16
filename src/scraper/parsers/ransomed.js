const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('li.wp-block-post').each((i, div) => {
        const meta = $(div).find('a');
        const title = meta.text().trim();
        const description = $(div).find('div.wp-block-post-excerpt').text().trim();
        const link = meta.attr('href');
        listDiv.push({ "title": title, "description": description, "link": link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;

