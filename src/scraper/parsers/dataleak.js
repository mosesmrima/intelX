const cheerio = require('cheerio');

function parseHTMLContent(htmlContent) {
    let listDiv = [];
    const $ = cheerio.load(htmlContent);
    const divsName = $('entry');
    divsName.each((i, div) => {
        let title = $(div).children().eq(0).text().trim(); // Adjusted to mimic the BeautifulSoup logic
        let descriptionContent = $(div).children().eq(9).html(); // Getting inner HTML to process further
        let description = '';
        if (descriptionContent) {
            let desc$ = cheerio.load(descriptionContent);
            description = desc$('p').text().trim(); // Extracting text from the first <p>
        }
        listDiv.push({"title": title, "description": description});
    });
    return listDiv;
}

module.exports = parseHTMLContent;
