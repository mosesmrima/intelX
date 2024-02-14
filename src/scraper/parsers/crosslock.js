const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.blog-posts');
    divsName.each((i, div) => {
        const title = $(div).find('h2').text().trim();
        let description = '';
        $(div).find('p').each((j, p) => {
            description += $(p).text().trim();
        });
        listDiv.push({"title": title, "description": description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
