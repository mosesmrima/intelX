const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.post.on-list').each((index, element) => {
        const title = $(element).find('h1 a').text().trim();
        const description = $(element).find('div.post-content p').text().trim();
        listDiv.push({ "title": title, "description": description });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
