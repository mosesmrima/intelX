const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.border.m-2.p-2').each((index, element) => {
        const title = $(element).find('div.m-2.h4').find('a').text().trim();
        const description = $(element).find('div.m-2').text().trim();
        try {
            const link = 'archive.php?company=' + $(element).find('button').attr('data-company');
            listDiv.push({ "title": title, "description": description, "link": link });
        } catch (error) {
          listDiv.push({ "title": title, "description": description });
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
