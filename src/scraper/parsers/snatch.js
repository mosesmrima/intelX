const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);

    $('div.ann-block').each((i, div) => {
        let title = $(div).find('div.a-b-n-name').text().trim();
        let description = $(div).find('div.a-b-text').text().trim();
        let onclickValue = $(div).find('button').attr('onclick');
        let link = '';
        if (onclickValue) {
            const linkMatch = onclickValue.match(/'([^']+)'/);
            link = linkMatch ? linkMatch[1] : '';
        }
        listDiv.push({ 'title': title, 'description': description, 'link': link });
    });

    return listDiv;
}

module.exports = parseHTMLContent;
