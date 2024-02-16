const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.card.mb-4.box-shadow');

    divsName.each((i, div) => {
        let title = $(div).find('h4.card-title').text().trim();
        let description = '';
        $(div).find('p').each((j, p) => {
            description += $(p).text().trim() + '\n';
        }).trim();
        let linkElement = $(div).find('a.btn.btn-primary.btn-sm');
        let link = linkElement.attr('href') ? linkElement.attr('href') : '';

        listDiv.push({"title": title, "description": description.trim(), "link": link});
    });

    return listDiv;
}

module.exports = parseHTMLContent;
