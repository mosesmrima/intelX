const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.story-card.css-76n6mc');

    divsName.each((i, div) => {
        let title = $(div).find('div.MuiTypography-root.MuiTypography-h5.MuiTypography-gutterBottom.css-bp7fp2').text().trim();
        let description = $(div).find('p.MuiTypography-root.MuiTypography-body2.css-1nwimy0').text().trim();
        let link = $(div).find('a').attr('href');
        listDiv.push({"title": title, "description": description, "link": link});
    });

    return listDiv;
}

module.exports = parseHTMLContent;
