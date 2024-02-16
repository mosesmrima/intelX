const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.blog-card').each((i, div) => {
        try {
            const title = $(div).find('div h4').text().trim();
            const description = "";
            listDiv.push({ "title": title, "description": description });
        } catch (error) {
            console.log(error)
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
