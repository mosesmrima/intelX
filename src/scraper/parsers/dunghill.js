const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    // Process divs with class "custom-container"
    $('div.custom-container').each((i, div) => {
        let title = $(div).find('div.ibody_title').text().trim();
        let description = $(div).find('div.ibody_body').find('p').eq(2).text().trim();
        let link = $(div).find('div.ibody_ft_right').find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link});
    });
    // Process divs with class "custom-container2" if needed
    $('div.custom-container2').each((i, div) => {
        let title = $(div).find('div.ibody_title').text().trim();
        let description = $(div).find('div.ibody_body').find('p').eq(2).text().trim();
        let link = $(div).find('div.ibody_ft_right').find('a').attr('href');
        listDiv.push({'title': title, 'description': description, 'link': link});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
