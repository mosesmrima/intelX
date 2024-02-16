const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.card').each((i, div) => {
        try {
            const title = $(div).find('h2').text().trim();
            const description = $(div).find('main').text().trim();
            const link = $(div).next('div').find('a').attr('href');
            listDiv.push({ "title": title, "description": description, "link": link });
        } catch (error) {
            console.error("Error processing a div.card:", error);
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
