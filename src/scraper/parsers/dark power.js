const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div[class="sm:w-1/2 mb-10 px-4"]');
    divsName.each((i, div) => {
        let title = $(div).find('h2').text().trim();
        let description = '';
        listDiv.push({'title': title, 'description': description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
