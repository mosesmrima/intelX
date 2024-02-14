const cheerio = require('cheerio');

function parseHTML(htmlContent) {
    let list_div = [];
    try {
        let $ = cheerio.load(htmlContent);
        $('div.list-group-item').each((i, div) => {
            let title = $(div).find('a').text().split(':')[0].trim();
            let description = $(div).find('div.small.opacity-50').text().trim();
            let link = $(div).find('a').attr('href');
            list_div.push({ title, description, link, discovered: new Date() });
        });
    } catch (error) {
        console.error("Failed to parse HTML content: ", error);
    }
    return list_div;
}

module.exports = parseHTML;
