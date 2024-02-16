const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('article').each((i, div) => {
        try {
            const title = $(div).find('h2').text();
            const description = $(div).find('div.entry-content').text().trim();
            const link = $(div).find('h2 a').attr('href');
            listDiv.push({ "title": title, "description": description, "link": link });
        } catch (error) {
            console.error("Failed parsing an article:", error);
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
