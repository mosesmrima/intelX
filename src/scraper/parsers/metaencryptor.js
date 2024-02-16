const cheerio = require('cheerio');

async function parseHTMLContent(htmlContent) {
    let listDiv = [];
    try {
        const $ = cheerio.load(htmlContent);
        const divsName = $('div.card.shadow-sm.border-info.shadow-lg');

        divsName.each((index, element) => {
            const title = $(element).find('div.card-header').text().trim();
            const description = $(element).find('p.card-text').text().trim();
            const link = $(element).find('a.btn.btn-primary.btn-sm').attr('href');
            listDiv.push({"title": title, "description": description, 'link': link});
        });
    } catch (error) {
        console.error("Error parsing HTML content:", error);
    }
    return listDiv;
}

module.exports = parseHTMLContent;
