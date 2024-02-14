const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const tbody = $('tbody');
    const divsName = tbody.find('tr');
    divsName.each((i, div) => {
        let tds = $(div).find('td');
        let title = tds.eq(0).text().trim();
        let description = tds.eq(2).text().trim();
        let magnets = tds.eq(2).find('span.magnet_link');
        magnets.each((j, magnet) => {
            listDiv.push({"title": title, "description": description, "magnet": $(magnet).text().trim()});
        });
    });
    return listDiv;
}

module.exports = parseHTMLContent;
