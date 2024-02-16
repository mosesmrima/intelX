const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.card-body.p-3.pt-2').each((i, div) => {
        const a = $(div).find('a.h5');
        const title = a.text().trim();
        const description = $(div).find('p').text().trim();
        const link = a.attr('href');
        listDiv.push({"title": title, "description": description, 'link': link});
    });

    $('div.card-body').each((i, div) => {
        const h2 = $(div).find('h2.card-title');
        if(h2.length > 0) {
            const title = h2.text().trim();
            const description = $(div).find('p').text().trim();
            const link = h2.find('a').attr('href');
            listDiv.push({"title": title, "description": description, 'link': link});
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
