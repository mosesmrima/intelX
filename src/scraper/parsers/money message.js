const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('a').each((i, elem) => {
        try {
            const section = $(elem).find('div.MuiBox-root.css-0');
            const title = section.text().trim();
            const description = "";
            const link = $(elem).attr('href');
            listDiv.push({"title": title, "description": description, "link": link});
        } catch (error) {
            console.error("Error parsing element:", error);
        }
    });

    return listDiv;
}

module.exports = parseHTMLContent;
