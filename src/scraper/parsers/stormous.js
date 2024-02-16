const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('center').each((i, center) => {
        try {
            const title = $(center).find('p.h1').text().trim();
            const description = $(center).find('p.description').text().trim();
            if (title) {
                listDiv.push({ "title": title, "description": description });
            }
        } catch (error) {
            // Handling error or ignoring if no title or description found
        }
    });

    $('div.item-details').each((i, item) => {
        const title = $(item).find('h3').text().trim();
        const description = $(item).find('p').text().trim();
        if (title) {
            listDiv.push({ "title": title, "description": description });
        }
    });

    $('table').each((i, table) => {
        const imgSrc = $(table).find('img').attr('src');
        const title = imgSrc ? imgSrc.split('/').pop().split('.')[0] : "";
        const description = $(table).find('p.description').text().trim();
        const link = $(table).find('p.textprice a').attr('href');
        if (title) {
            listDiv.push({ "title": title, "description": description, "link": link });
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
