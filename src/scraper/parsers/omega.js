const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('tr.trow').each((i, div) => {
        let item = $(div).find('td');
        let title = $(item[0]).text().trim();
        let description = $(item[2]).text().trim();
        let link = $(item[5]).find('a').attr('href');
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;

// Example usage:
// Assuming you have the HTML content in `htmlContent` variable
// const html
