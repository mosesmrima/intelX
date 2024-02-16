const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('td[valign="top"]').each((i, div) => {
        const title = $(div).find('font[size=4]').text().trim();
        const link = $(div).find('a[style="text-decoration: none;"]').attr('href');
        $(div).find('font[size=2][color="#5B61F6"]').each((j, description) => {
            if (!$(description).find('b').text().trim().startsWith("http")) {
                listDiv.push({
                    "title": title,
                    "description": $(description).find('b').text().trim(),
                    "link": link
                });
                return false; // equivalent to 'break' in the loop
            }
        });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
