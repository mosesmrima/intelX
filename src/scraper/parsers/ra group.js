const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.row').each((index, element) => {
        $(element).find('a').each((i, item) => {
            const title = $(item).text().trim();
            const description = ''; // Keeping description empty as per original logic
            const link = $(item).attr('href');
            listDiv.push({ "title": title, "description": description, "link": link });
        });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
