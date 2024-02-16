const cheerio = require('cheerio');

function parseHTMLContent(htmlContent, isXML) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent, {
        xmlMode: isXML // Process as XML if isXML is true
    });

    if (isXML) {
        $('item').each((i, item) => {
            const title = $(item).find('title').text();
            const description = $(item).find('description').text();
            listDiv.push({ "title": title, "description": description });
        });
    } else {
        $('ul.list > li').each((i, li) => {
            const title = $(li).find('a').attr('title').trim();
            const link = $(li).find('a').attr('href');
            listDiv.push({ "title": title, "description": "", "link": link });
        });
    }

    return listDiv;
}

module.exports = parseHTMLContent;
